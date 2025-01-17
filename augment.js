(() => {
  const NAMESPACE = "aug-search-" + Math.random().toString(36).substr(2, 9);
  const CMS_PATTERNS = {
    Webflow: {
      signatures: [
        "webflow.js",
        'generator" content="webflow',
        "w-nav",
        "data-w-id",
        ".w-dyn-item",
        ".w-lightbox",
      ],
      searchPatterns: [
        '.w-form-input[type="search"]',
        ".search-input",
        "[data-search-input]",
        '.w-input[type="search"]',
      ],
    },
    Docusaurus: {
      signatures: [
        'generator" content="docusaurus',
        "docusaurus.config",
        "docs-doc-page",
        "/static/img/",
        "docusaurus-theme-classic",
      ],
      searchPatterns: [
        ".DocSearch-Input",
        ".DocSearch-Button",
        "#docsearch-input",
        ".navbar__search-input",
        ".theme-doc-search-bar",
      ],
    },
    GitBook: {
      signatures: [
        'generator" content="gitbook',
        "gitbook.js",
        "gitbook-plugin",
        'class="gitbook"',
        "/gitbook/assets/",
      ],
      searchPatterns: [
        'input[placeholder="Search content"]',
        'div[role="dialog"] input.text-dark',
        'div[role="dialog"][aria-label="Search"] input',
        "input.text-dark.placeholder\\:text-dark\\/7",
        ".scroll-nojump input",
        "input[placeholder='Search content or ask a question']",
        "div.flex-row input",
      ],
    },
    Zendesk: {
      signatures: [
        "zendesk-widget",
        "zendesk_app_framework",
        "/hc/en-us/",
        'class="zendesk"',
        "zopim",
      ],
      searchPatterns: [
        ".search-query",
        "#query",
        ".hc-search-input",
        'input[name="query"]',
        ".zendesk-search-input",
      ],
    },
    WordPress: {
      signatures: ['generator" content="wordpress'],
      searchPatterns: [
        ".search-field",
        'form[role="search"] input',
        "input.wp-block-search__input",
        ".wp-search-form input",
        "#s",
      ],
    },
  };
  const BASE_STYLES = `
    .${NAMESPACE}-wrapper {
      position: relative !important;
      display: flex !important;
      align-items: center !important;
      width: 100% !important;
      z-index: 99999 !important;
    }
    .${NAMESPACE}-wrapper input {
      flex-grow: 1 !important;
      width: 100% !important;
      position: relative !important;
      z-index: 1 !important;
    }
    .${NAMESPACE}-button {
      margin-left: 5px !important;
      padding: 5px 10px !important;
      background: #fff !important;
      color: #000 !important;
      width: 90px !important;
      border: none !important;
      border-radius: 4px !important;
      cursor: pointer !important;
    }
  `;

  function injectCustomGPTScript() {
    if (
      !document.querySelector(
        "script[src='https://cdn.customgpt.ai/js/ai-assistant.js']"
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://cdn.customgpt.ai/js/ai-assistant.js";
      script.defer = true;
      script.setAttribute("p_id", "1403"); // Replace with your actual PROJECT_ID
      script.setAttribute("p_key", "e2dd2450b0def867a6e1608659ffe944"); // Replace with your actual PROJECT_KEY
      document.body.appendChild(script);
      console.log("CustomGPT AI Assistant script loaded.");
    }
  }

  function injectStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.id = `${NAMESPACE}-styles`;
    styleSheet.textContent = BASE_STYLES;
    document.head.appendChild(styleSheet);
  }

  function augmentSearchBox(searchBox) {
    if (searchBox.hasAttribute("data-augmented")) {
      return;
    }

    searchBox.setAttribute("data-augmented", "true");
    const wrapper = document.createElement("div");
    wrapper.className = `${NAMESPACE}-wrapper`;
    searchBox.parentNode.insertBefore(wrapper, searchBox);
    wrapper.appendChild(searchBox);

    const aiButton = document.createElement("button");
    aiButton.className = `${NAMESPACE}-button`;
    aiButton.setAttribute("data-cgpt-ai-assistant", "true");
    aiButton.innerHTML = `
   <div style="display: flex; align-items: center; justify-content: center; gap: 2px;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="repeat" style="width: 16px; height: 16px;">
      <g>
        <path d="M17.91 5h-12l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.91 7h12a1.56 1.56 0 0 1 1.59 1.53V11a1 1 0 0 0 2 0V8.53A3.56 3.56 0 0 0 17.91 5zm.3 9.29a1 1 0 0 0-1.42 1.42l1.3 1.29h-12a1.56 1.56 0 0 1-1.59-1.53V13a1 1 0 0 0-2 0v2.47A3.56 3.56 0 0 0 6.09 19h12l-1.3 1.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42z"></path>
      </g>
    </svg>
    <div style="font-size: 14px; font-weight: 500;">Ask AI</div>
  </div>
`;

    wrapper.appendChild(aiButton);
  }

  function detectAndAugmentSite() {
    injectCustomGPTScript();
    injectStyles();

    const detectedCMS = detectCMS();
    const searchBoxes =
      detectedCMS === "GitBook"
        ? document.querySelectorAll(
            CMS_PATTERNS.GitBook.searchPatterns.join(", ")
          )
        : document.querySelectorAll("input[type='text'], input[type='search']");

    searchBoxes.forEach((searchBox) => augmentSearchBox(searchBox));
    console.log("Detected CMS:", detectedCMS);
  }

  function detectCMS() {
    const html = document.documentElement.innerHTML;
    for (const [cms, config] of Object.entries(CMS_PATTERNS)) {
      if (
        config.signatures.some((sign) =>
          html.toLowerCase().includes(sign.toLowerCase())
        )
      ) {
        return cms;
      }
    }
    return "Unknown";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", detectAndAugmentSite);
  } else {
    detectAndAugmentSite();
  }
})();
