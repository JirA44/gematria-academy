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
const MAX_REQUESTS_PER_MINUTE = 12;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
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
    const scriptTag = '<script defer src="/assets/js/site-language.js?v=2"></script>';
    if (!html.includes("/assets/js/site-language.js")) {
      if (/<\/head\s*>/i.test(html)) html = html.replace(/<\/head\s*>/i, scriptTag + "</head>");
      else html = scriptTag + html;
    }
    const headers = new Headers(response.headers);
    headers.delete("Content-Length");
    headers.delete("Content-Encoding");
    headers.delete("ETag");
    headers.delete("Content-MD5");
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
