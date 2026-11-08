const LANGUAGES = {
  en: "english",
  zh: "chinese",
  hi: "hindi",
  es: "spanish",
  ar: "arabic",
  bn: "bengali",
  pt: "portuguese",
  ru: "russian",
  ur: "urdu"
};

const requestWindows = new Map();
const clientErrorWindows = new Map();
const MAX_REQUESTS_PER_MINUTE = 12;
const MAX_CLIENT_ERROR_REPORTS_PER_MINUTE = 5;
const SITE_VERSION = "1.2.1324";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function insertBeforeLastTag(html, closingTagPattern, markup) {
  const matches = [...html.matchAll(closingTagPattern)];
  const closingTag = matches[matches.length - 1];
  if (!closingTag) return html + markup;
  return html.slice(0, closingTag.index) + markup + html.slice(closingTag.index);
}

function allowRequest(ip) {
  const now = Date.now();
  const previous = requestWindows.get(ip) || [];
  const recent = previous.filter((stamp) => now - stamp < 60_000);
  if (recent.length >= MAX_REQUESTS_PER_MINUTE) {
    requestWindows.set(ip, recent);
    return false;
  }
  recent.push(now);
  requestWindows.set(ip, recent);
  if (requestWindows.size > 5000) {
    for (const [key, values] of requestWindows) {
      if (!values.some((stamp) => now - stamp < 60_000)) requestWindows.delete(key);
    }
  }
  return true;
}

function allowClientErrorReport(ip) {
  const now = Date.now();
  const previous = clientErrorWindows.get(ip) || [];
  const recent = previous.filter((stamp) => now - stamp < 60_000);
  if (recent.length >= MAX_CLIENT_ERROR_REPORTS_PER_MINUTE) {
    clientErrorWindows.set(ip, recent);
    return false;
  }
  recent.push(now);
  clientErrorWindows.set(ip, recent);
  if (clientErrorWindows.size > 5000) {
    for (const [key, values] of clientErrorWindows) {
      if (!values.some((stamp) => now - stamp < 60_000)) clientErrorWindows.delete(key);
    }
  }
  return true;
}

async function receiveClientError(request) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  let originUrl;
  try { originUrl = origin ? new URL(origin) : null; } catch { originUrl = null; }
  if (!originUrl || originUrl.origin !== requestUrl.origin) return json({ error: "origin_not_allowed" }, 403);

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) return json({ error: "unsupported_media_type" }, 415);
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 1_500) return json({ error: "payload_too_large" }, 413);

  let payload;
  try {
    const raw = await request.text();
    if (raw.length > 1_500) return json({ error: "payload_too_large" }, 413);
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const expectedKeys = ["category", "code", "schema", "version"];
  if (!payload || typeof payload !== "object" || Array.isArray(payload) ||
      Object.keys(payload).sort().join(",") !== expectedKeys.join(",") ||
      payload.schema !== 1 ||
      !["javascript_error", "unhandled_rejection", "resource_load", "fetch_failure", "http_5xx", "console_error", "visible_error"].includes(payload.code) ||
      !["auth", "language", "writing", "learning", "site"].includes(payload.category) ||
      typeof payload.version !== "string" || !/^1\.2\.\d{3,5}$/.test(payload.version)) {
    return json({ error: "invalid_payload" }, 400);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!allowClientErrorReport(ip)) return json({ error: "rate_limited" }, 429);

  const reportId = crypto.randomUUID();
  console.warn("gematria_client_error", JSON.stringify({
    reportId,
    code: payload.code,
    category: payload.category,
    version: payload.version,
    receivedAt: new Date().toISOString()
  }));
  return json({ accepted: true, reportId }, 202);
}

async function translate(request, env) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const origin = request.headers.get("Origin");
  const requestUrl = new URL(request.url);
  let originUrl;
  try { originUrl = origin ? new URL(origin) : null; } catch { originUrl = null; }
  if (!originUrl || originUrl.origin !== requestUrl.origin) return json({ error: "origin_not_allowed" }, 403);
  if (!env.AI || typeof env.AI.run !== "function") return json({ error: "translation_unavailable" }, 503);

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 12_000) return json({ error: "payload_too_large" }, 413);
  let payload;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) return json({ error: "payload_too_large" }, 413);
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const target = payload?.target;
  const texts = payload?.texts;
  if (!LANGUAGES[target] || !Array.isArray(texts) || texts.length < 1 || texts.length > 12) {
    return json({ error: "invalid_payload" }, 400);
  }
  if (texts.some((text) => typeof text !== "string" || text.length > 1_200) ||
      texts.reduce((total, text) => total + text.length, 0) > 6_000) {
    return json({ error: "text_limit_exceeded" }, 413);
  }

  const digestInput = new TextEncoder().encode(target + "\0" + JSON.stringify(texts));
  const digest = await crypto.subtle.digest("SHA-256", digestInput);
  const hash = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const cacheRequest = new Request(requestUrl.origin + "/__translation-cache/" + target + "/" + hash);
  let cache;
  try {
    cache = caches.default;
    const hit = await cache.match(cacheRequest);
    if (hit) return new Response(hit.body, { status: 200, headers: { "Content-Type": "application/json; charset=utf-8" } });
  } catch {
    cache = null;
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!allowRequest(ip)) return json({ error: "rate_limited" }, 429);

  try {
    const translations = await Promise.all(texts.map(async (text) => {
      const result = await env.AI.run("@cf/meta/m2m100-1.2b", {
        text,
        source_lang: "french",
        target_lang: LANGUAGES[target]
      });
      if (typeof result === "string") return result;
      return result?.translated_text || result?.translation || "";
    }));
    if (translations.some((text) => !text)) return json({ error: "translation_failed" }, 502);
    const body = JSON.stringify({ translations });
    if (cache) {
      try {
        await cache.put(cacheRequest, new Response(body, {
          headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=2592000" }
        }));
      } catch {
        // A cache write failure must not block a valid translation.
      }
    }
    return json({ translations });
  } catch {
    return json({ error: "translation_failed" }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/client-errors") return receiveClientError(request);
    if (url.pathname === "/api/i18n/translate") return translate(request, env);
    if (request.method !== "GET") return env.ASSETS.fetch(request);

    const response = await env.ASSETS.fetch(request);
    const type = response.headers.get("Content-Type") || "";
    if (response.status !== 200 || !type.toLowerCase().includes("text/html")) return response;

    let html;
    try {
      html = await response.text();
    } catch {
      return response;
    }
    const mainMenuPages = new Set(["/", "/index.html", "/index_production.html", "/index_standard.html", "/index_principal.html", "/index_portal.html"]);
    const navigationStyle = `<style id="ga-global-navigation-style">
      .ga-global-nav,.ga-global-footer{width:min(1180px,calc(100% - 32px));margin:12px auto;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:10px 12px;border:1px solid rgba(213,180,93,.35);border-radius:12px;background:rgba(16,21,36,.94);color:#f4f0e7;font:600 13px/1.4 system-ui,sans-serif}
      .ga-global-footer{margin:42px auto 18px;padding:18px 12px}
      .ga-global-nav a,.ga-global-footer a{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:8px 13px;border:1px solid rgba(213,180,93,.3);border-radius:8px;background:rgba(255,255,255,.035);color:#f0d989;text-decoration:none}
      .ga-global-nav a:hover,.ga-global-footer a:hover,.ga-global-nav a:focus-visible,.ga-global-footer a:focus-visible{background:rgba(213,180,93,.14);outline:2px solid #f0d989;outline-offset:2px}
      #ga-page-top{position:absolute;top:0}
      .ga-site-version{width:min(1180px,calc(100% - 32px));margin:12px auto 20px;padding:8px 12px;border-top:1px solid rgba(213,180,93,.2);color:#9da6ba;text-align:center;font:11px/1.5 system-ui,sans-serif}
      .ga-site-version strong{color:#f0d989;font-weight:700}
      @media(max-width:600px){.ga-global-nav,.ga-global-footer{width:calc(100% - 20px);gap:6px;padding:9px}.ga-global-nav a,.ga-global-footer a{flex:1 1 42%;font-size:12px}}
      .ga-error-reporting-control{width:min(1180px,calc(100% - 32px));margin:6px auto 12px;color:#d7dbe5;font:12px/1.5 system-ui,sans-serif}
      .ga-error-reporting-control details{border-left:2px solid rgba(213,180,93,.55);padding:5px 10px}
      .ga-error-reporting-control summary{cursor:pointer;color:#f0d989;font-weight:600}
      .ga-error-reporting-control p{max-width:820px;margin:8px 0;color:#aeb7c8}
      .ga-error-reporting-control label{display:flex;align-items:center;gap:8px;width:fit-content;cursor:pointer}
      .ga-error-reporting-control input{accent-color:#d5b45d}
    </style>`;
    if (!html.includes('id="ga-global-navigation-style"') && /<\/head\s*>/i.test(html)) {
      html = html.replace(/<\/head\s*>/i, navigationStyle + "</head>");
    }
    if (!mainMenuPages.has(url.pathname.toLowerCase()) && !html.includes('class="ga-global-nav"')) {
      const topNavigation = '<a id="ga-page-top" tabindex="-1" aria-hidden="true"></a><nav class="ga-global-nav" aria-label="Navigation Gematria Academy"><a href="/index.html">Menu principal</a><a href="/parcours-apprentissage.html">Hub des parcours</a><a href="/index_ecritures_sacrees.html">Hub des écritures</a></nav>';
      const bottomNavigation = '<nav class="ga-global-footer" aria-label="Raccourcis de fin de page"><a href="#ga-page-top">↑ Haut de page</a><a href="/index.html">Menu principal</a><a href="/parcours-apprentissage.html">Hub des parcours</a><a href="/index_ecritures_sacrees.html">Hub des écritures</a></nav>';
      if (/<body\b[^>]*>/i.test(html)) {
        html = html.replace(/<body\b[^>]*>/i, (tag) => tag + topNavigation);
        html = insertBeforeLastTag(html, /<\/body\s*>/gi, bottomNavigation);
      }
    }
    if (!html.includes('id="ga-error-reporting-control"')) {
      html = insertBeforeLastTag(html, /<\/body\s*>/gi, "<div id=\"ga-error-reporting-control\" class=\"ga-error-reporting-control\"><details><summary id=\"ga-error-reporting-summary\">Signalement technique activé</summary><p>Lorsqu’une erreur survient, Gematria Academy envoie automatiquement son type, une catégorie de page et la version du site afin d’aider à corriger le bug. Le rapport ne contient ni texte saisi, ni nom, ni e-mail, ni jeton, ni URL complète. La requête réseau révèle toutefois l’adresse IP au fournisseur d’hébergement. Tu peux désactiver l’envoi ici.</p><label><input id=\"ga-error-reporting-enabled\" type=\"checkbox\" checked> Envoyer automatiquement les erreurs techniques</label></details></div>");
    }
    if (!html.includes('id="ga-site-version-footer"')) {
      const versionFooter = '<footer id="ga-site-version-footer" class="ga-site-version" aria-label="Version détaillée de Gematria Academy">Version détaillée <strong>' + SITE_VERSION + '</strong></footer>';
      html = insertBeforeLastTag(html, /<\/body\s*>/gi, versionFooter);
    }
    const scriptTag = '<script defer src="/assets/js/site-language.js?v=5"></script>';
    const reportScriptPattern = /src=["'][^"']*assets\/js\/error-reporting\.js(?:\?[^"']*)?["']/i;
    if (reportScriptPattern.test(html)) {
      html = html.replace(reportScriptPattern, 'src="/assets/js/error-reporting.js?v=1"');
    } else if (/<\/head\s*>/i.test(html)) {
      html = html.replace(/<\/head\s*>/i, '<script defer src="/assets/js/error-reporting.js?v=1"></script></head>');
    }

    const languageScriptPattern = /src=["'][^"']*assets\/js\/site-language\.js(?:\?[^"']*)?["']/i;
    if (languageScriptPattern.test(html)) {
      html = html.replace(languageScriptPattern, 'src="/assets/js/site-language.js?v=5"');
    } else if (/<\/head\s*>/i.test(html)) {
      html = html.replace(/<\/head\s*>/i, scriptTag + "</head>");
    } else {
      html = scriptTag + html;
    }
    const headers = new Headers(response.headers);
    headers.delete("Content-Length");
    headers.delete("Content-Encoding");
    headers.delete("ETag");
    headers.delete("Content-MD5");
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
