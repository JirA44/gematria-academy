(() => {
  "use strict";
  const ENDPOINT = "/api/client-errors";
  const PREF_KEY = "gematria_error_reporting_enabled";
  const VERSION = "1.2.1325";
  const ALLOWED_CODES = new Set([
    "javascript_error", "unhandled_rejection", "resource_load",
    "fetch_failure", "http_5xx", "console_error", "visible_error"
  ]);
  let enabled = true;
  let sentCount = 0;
  const recent = new Map();
  try { enabled = localStorage.getItem(PREF_KEY) !== "0"; } catch {}

  function pageCategory() {
    const path = location.pathname.toLowerCase();
    if (/\/pages\/user\//.test(path)) return "auth";
    if (/coreen|japonais|korean|japanese/.test(path)) return "language";
    if (/hieroglyph|maya|runes|hebreu|alphabet/.test(path)) return "writing";
    if (/parcours|lesson|cours/.test(path)) return "learning";
    return "site";
  }

  function report(code) {
    if (!enabled || !ALLOWED_CODES.has(code) || sentCount >= 8) return;
    const category = pageCategory();
    const dedupeKey = code + ":" + category;
    const now = Date.now();
    if (now - (recent.get(dedupeKey) || 0) < 60_000) return;
    recent.set(dedupeKey, now);
    sentCount++;
    const body = JSON.stringify({ schema: 1, code, category, version: VERSION });
    fetchNative(ENDPOINT, {
      method: "POST",
      mode: "same-origin",
      credentials: "omit",
      cache: "no-store",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body
    }).catch(() => {});
  }

  const fetchNative = window.fetch.bind(window);
  window.gematriaReportError = code => report(ALLOWED_CODES.has(code) ? code : "visible_error");

  window.addEventListener("error", event => {
    report(event.target && event.target !== window ? "resource_load" : "javascript_error");
  }, true);
  window.addEventListener("unhandledrejection", () => report("unhandled_rejection"));

  window.fetch = async function(input, init) {
    let sameOrigin = false;
    try {
      const target = input instanceof Request ? input.url : String(input);
      sameOrigin = new URL(target, location.href).origin === location.origin;
    } catch {}
    try {
      const response = await fetchNative(input, init);
      if (response.status >= 500) report("http_5xx");
      return response;
    } catch (error) {
      if (String(input) !== ENDPOINT) report("fetch_failure");
      throw error;
    }
  };

  const consoleErrorNative = console.error.bind(console);
  console.error = function(...args) {
    report("console_error");
    return consoleErrorNative(...args);
  };

  const alertNative = window.alert.bind(window);
  window.alert = function(message) {
    if (/erreur|impossible|échec|failed|error|réessay/i.test(String(message || ""))) report("visible_error");
    return alertNative(message);
  };

  function watchVisibleErrors() {
    const selector = '[role="alert"],[aria-live="assertive"],.error-message,.error-toast,.toast-error,.toast--error,.notification--error,.alert-danger,.alert-error,[data-error],[data-toast="error"]';
    const errorWords = /erreur|impossible|échec|failed|failure|error|réessay|could not|unable to|not available/i;
    const check = node => {
      const element = node instanceof Element ? node : node?.parentElement;
      if (!element) return;
      const target = element.matches(selector) ? element : element.querySelector(selector) || element.closest(selector);
      if (target && errorWords.test(target.textContent || "")) report("visible_error");
    };
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === "characterData") check(record.target);
        for (const node of record.addedNodes || []) check(node);
      }
    });
    observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });
  }
  if (document.documentElement) watchVisibleErrors();
  else document.addEventListener("DOMContentLoaded", watchVisibleErrors, { once: true });

  function bindPreference() {
    const checkbox = document.getElementById("ga-error-reporting-enabled");
    const summary = document.getElementById("ga-error-reporting-summary");
    if (!checkbox) return;
    checkbox.checked = enabled;
    const updateLabel = () => {
      if (summary) summary.textContent = enabled ? "Signalement technique activé" : "Signalement technique désactivé";
    };
    updateLabel();
    checkbox.addEventListener("change", () => {
      enabled = checkbox.checked;
      try { localStorage.setItem(PREF_KEY, enabled ? "1" : "0"); } catch {}
      updateLabel();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindPreference, { once: true });
  else bindPreference();
})();
