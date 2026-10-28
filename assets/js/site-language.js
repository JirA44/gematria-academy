(() => {
  "use strict";

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "hi", name: "हिन्दी" },
    { code: "es", name: "Español" },
    { code: "ar", name: "العربية" },
    { code: "bn", name: "বাংলা" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "ur", name: "اردو" }
  ];
  const supported = new Set(languages.map((item) => item.code));
  const rtl = new Set(["ar", "ur"]);
  const uiLabels = {
    fr: { label: "Langue", status: "Traduction automatique par IA", loading: "Traduction en cours…" },
    en: { label: "Language", status: "Automatic AI translation", loading: "Translating…" },
    zh: { label: "语言", status: "AI 自动翻译", loading: "正在翻译…" },
    hi: { label: "भाषा", status: "AI स्वचालित अनुवाद", loading: "अनुवाद हो रहा है…" },
    es: { label: "Idioma", status: "Traducción automática con IA", loading: "Traduciendo…" },
    ar: { label: "اللغة", status: "ترجمة آلية بالذكاء الاصطناعي", loading: "جارٍ الترجمة…" },
    bn: { label: "ভাষা", status: "এআই স্বয়ংক্রিয় অনুবাদ", loading: "অনুবাদ হচ্ছে…" },
    pt: { label: "Idioma", status: "Tradução automática por IA", loading: "Traduzindo…" },
    ru: { label: "Язык", status: "Автоматический перевод ИИ", loading: "Перевод…" },
    ur: { label: "زبان", status: "اے آئی خودکار ترجمہ", loading: "ترجمہ جاری ہے…" }
  };

  const originalText = new WeakMap();
  const registered = new WeakSet();
  const translatedNodes = new Set();
  const visibleElements = new Set();
  const observedElements = new Map();
  let observer;
  let mutationObserver;
  let queuedNodes = new WeakSet();
  let pending = [];
  let active = 0;
  let currentLanguage = "fr";
  let panel;
  let select;
  let status;

  function detectLanguage() {
    for (const candidate of navigator.languages || [navigator.language || "fr"]) {
      const base = String(candidate).toLowerCase().split("-")[0];
      if (supported.has(base)) return base;
    }
    return "fr";
  }

  function hash(text) {
    let a = 0x811c9dc5;
    let b = 0x9e3779b9;
    for (let i = 0; i < text.length; i += 1) {
      const code = text.charCodeAt(i);
      a = Math.imul(a ^ code, 0x01000193);
      b = Math.imul(b ^ (code + i), 0x85ebca6b);
    }
    return (a >>> 0).toString(36) + (b >>> 0).toString(36);
  }

  function cacheKey(lang, text) {
    return "ga-i18n-v1:" + lang + ":" + hash(text);
  }

  function getCached(lang, text) {
    try { return localStorage.getItem(cacheKey(lang, text)); } catch { return null; }
  }

  function setCached(lang, text, translated) {
    try { localStorage.setItem(cacheKey(lang, text), translated); } catch { /* Cache is optional. */ }
  }

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function updatePanel() {
    const labels = uiLabels[currentLanguage] || uiLabels.fr;
    if (panel) panel.querySelector("label").textContent = labels.label;
    if (status && !active && !pending.length) setStatus(labels.status);
    if (select) select.value = currentLanguage;
  }

  function createPanel() {
    if (document.getElementById("ga-language-panel")) return;
    panel = document.createElement("aside");
    panel.id = "ga-language-panel";
    panel.setAttribute("aria-label", "Language selector");
    panel.innerHTML = '<label for="ga-language-select"></label><select id="ga-language-select"></select><span id="ga-language-status" role="status" aria-live="polite"></span>';
    select = panel.querySelector("select");
    status = panel.querySelector("[role=status]");
    for (const language of languages) {
      const option = document.createElement("option");
      option.value = language.code;
      option.textContent = language.name;
      select.append(option);
    }
    select.addEventListener("change", () => setLanguage(select.value));
    const style = document.createElement("style");
    style.textContent = [
      "#ga-language-panel{position:fixed;z-index:2147483000;top:10px;right:10px;display:flex;align-items:center;gap:7px;padding:7px 9px;border:1px solid #d5b45d88;border-radius:10px;background:#101524ed;color:#f4f0e7;font:12px/1.3 system-ui,sans-serif;box-shadow:0 4px 20px #0005;backdrop-filter:blur(8px)}",
      "#ga-language-panel label{font-weight:600}",
      "#ga-language-panel select{max-width:145px;border:1px solid #556078;border-radius:6px;background:#182138;color:inherit;padding:5px}",
      "#ga-language-panel span{max-width:150px;color:#c8cddd;font-size:10px}",
      "@media(max-width:600px){#ga-language-panel{top:auto;right:8px;bottom:8px;left:8px;justify-content:space-between}#ga-language-panel span{max-width:120px}}"
    ].join("");
    document.head.append(style);
    document.body.append(panel);
  }

  function getOriginal(node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue || "");
    return originalText.get(node);
  }

  function applyText(node, translated, source) {
    if (!node.isConnected || currentLanguage !== source) return;
    const original = getOriginal(node);
    const leading = (original.match(/^\s*/) || [""])[0];
    const trailing = (original.match(/\s*$/) || [""])[0];
    node.nodeValue = leading + translated.trim() + trailing;
    translatedNodes.add(node);
  }

  function excluded(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    return !!parent.closest("script,style,noscript,code,pre,textarea,input,select,option,svg,math,[translate='no'],#ga-language-panel,[aria-hidden='true']");
  }

  function enqueue(node) {
    if (currentLanguage === "fr" || queuedNodes.has(node) || !node.isConnected) return;
    const source = getOriginal(node).trim();
    if (source.length < 2 || source.length > 1200) return;
    const cached = getCached(currentLanguage, source);
    if (cached) {
      applyText(node, cached, currentLanguage);
      return;
    }
    queuedNodes.add(node);
    pending.push({ node, source, lang: currentLanguage });
    setStatus((uiLabels[currentLanguage] || uiLabels.fr).loading);
    pump();
  }

  async function translateBatch(batch, lang) {
    const response = await fetch("/api/i18n/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ target: lang, texts: batch.map((item) => item.source) })
    });
    if (!response.ok) throw new Error("translation_unavailable");
    const result = await response.json();
    if (!Array.isArray(result.translations) || result.translations.length !== batch.length) {
      throw new Error("invalid_translation");
    }
    result.translations.forEach((translated, index) => {
      if (typeof translated !== "string" || !translated.trim()) return;
      const item = batch[index];
      setCached(lang, item.source, translated);
      applyText(item.node, translated, lang);
    });
  }

  function pump() {
    while (active < 2 && pending.length) {
      const first = pending.shift();
      if (first.lang !== currentLanguage || !first.node.isConnected) continue;
      const batch = [first];
      let chars = first.source.length;
      while (pending.length && batch.length < 12) {
        const next = pending[0];
        if (next.lang !== currentLanguage) { pending.shift(); continue; }
        if (chars + next.source.length > 6000) break;
        pending.shift();
        batch.push(next);
        chars += next.source.length;
      }
      active += 1;
      translateBatch(batch, first.lang)
        .then(() => setStatus((uiLabels[currentLanguage] || uiLabels.fr).status))
        .catch(() => setStatus("Traduction indisponible pour le moment."))
        .finally(() => {
          active -= 1;
          pump();
        });
    }
  }

  function registerTree(root) {
    if (currentLanguage === "fr") return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    const groups = new Map();
    while ((node = walker.nextNode())) {
      if (excluded(node)) continue;
      const text = getOriginal(node).trim();
      if (text.length < 2 || text.length > 1200) continue;
      const parent = node.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(node);
    }
    for (const [element, nodes] of groups) {
      observedElements.set(element, nodes);
      if (observer && !registered.has(element)) {
        registered.add(element);
        observer.observe(element);
      }
      if (!observer || visibleElements.has(element)) nodes.forEach(enqueue);
    }
  }

  function setLanguage(language) {
    if (!supported.has(language)) return;
    currentLanguage = language;
    try { localStorage.setItem("language", language); } catch { /* Preference is optional. */ }
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    document.documentElement.dir = rtl.has(language) ? "rtl" : "ltr";
    pending = [];
    queuedNodes = new WeakSet();
    updatePanel();

    if (language === "fr") {
      for (const node of translatedNodes) {
        if (node.isConnected) node.nodeValue = originalText.get(node);
      }
      translatedNodes.clear();
      return;
    }
    registerTree(document.body);
    for (const element of visibleElements) (observedElements.get(element) || []).forEach(enqueue);
  }

  function init() {
    const saved = (() => { try { return localStorage.getItem("language"); } catch { return null; } })();
    currentLanguage = supported.has(saved) ? saved : detectLanguage();
    createPanel();
    updatePanel();
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
    document.documentElement.dir = rtl.has(currentLanguage) ? "rtl" : "ltr";

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleElements.add(entry.target);
            (observedElements.get(entry.target) || []).forEach(enqueue);
          } else {
            visibleElements.delete(entry.target);
          }
        }
      }, { rootMargin: "120px 0px" });
    }
    if (currentLanguage !== "fr") registerTree(document.body);

    mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (added.nodeType === Node.ELEMENT_NODE || added.nodeType === Node.TEXT_NODE) {
            registerTree(added.nodeType === Node.ELEMENT_NODE ? added : added.parentElement);
          }
        }
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.siteLanguage = { get: () => currentLanguage, set: setLanguage };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
