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
      signatures: [
        'generator" content="wordpress',
        "/wp-includes/css",
        "/wp-content/cache",
      ],
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
    width: auto !important; /* Avoid overriding global input styles */
    position: relative !important;
    z-index: 1 !important;
  }
  .${NAMESPACE}-button {
    padding-right: 10px !important;
    padding-left: 0 !important;
    margin-right: 5px !important;
    background: linear-gradient(135deg, #C362E4, #A065E9 35%, #6C67EF 68%, #5D93F4) !important;
    color: #fff !important;
    width: 70px !important;
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
      script.setAttribute("p_id", "1037");
      script.setAttribute("p_key", "50fc33cd7f1f79e4958d705fb062bb0e");
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

  function augmentSearchBox(searchBox, isWordPress) {
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
    if (isWordPress) {
      aiButton.style.position = "relative";
      aiButton.style.right = "74px";
      aiButton.style.zIndex = "30";
    }
    aiButton.innerHTML = `
   <div style="display: flex; align-items: center; justify-content: center;">
<svg width="22" height="22" viewBox="0 0 67 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_264_111" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="27" y="20" width="24" height="24">
    <ellipse cx="39.4009" cy="22.5354" rx="1.89502" ry="1.91435" fill="white"/>
    <ellipse cx="39.4009" cy="41.679" rx="1.89502" ry="1.91435" fill="white"/>
    <ellipse cx="29.5474" cy="32.4905" rx="1.89502" ry="1.91435" fill="white"/>
    <ellipse cx="48.4966" cy="32.4905" rx="1.89502" ry="1.91435" fill="white"/>
    <path d="M41.2977 22.918C41.6767 28.2782 47.7408 31.3411 48.8778 30.9583L47.7408 34.4041C43.496 34.4041 41.6767 39.509 41.2977 42.0615H37.5077C37.5077 36.2419 32.707 34.5317 30.3066 34.4041V30.9583C34.8547 30.9583 37.0024 25.5981 37.5077 22.918H41.2977Z" fill="white"/>
  </mask>
  <g mask="url(#mask0_264_111)">
    <rect x="26.8926" y="16.0264" width="12.8861" height="35.9898" fill="white"/>
  </g>
  <mask id="mask1_264_111" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="28" y="20" width="24" height="24">
    <ellipse cx="1.89502" cy="1.91435" rx="1.89502" ry="1.91435" transform="matrix(-1 0 0 1 41.2969 20.6211)" fill="white"/>
    <ellipse cx="1.89502" cy="1.91435" rx="1.89502" ry="1.91435" transform="matrix(-1 0 0 1 41.2969 39.7646)" fill="white"/>
    <ellipse cx="1.89502" cy="1.91435" rx="1.89502" ry="1.91435" transform="matrix(-1 0 0 1 51.1504 30.5762)" fill="white"/>
    <ellipse cx="1.89502" cy="1.91435" rx="1.89502" ry="1.91435" transform="matrix(-1 0 0 1 32.2012 30.5762)" fill="white"/>
    <path d="M37.505 22.918C37.126 28.2782 31.0619 31.3411 29.9249 30.9583L31.0619 34.4041C35.3068 34.4041 37.126 39.509 37.505 42.0615H41.295C41.295 36.2419 46.0957 34.5317 48.4961 34.4041V30.9583C43.9481 30.9583 41.8004 25.5981 41.295 22.918H37.505Z" fill="white"/>
  </mask>
  <g mask="url(#mask1_264_111)">
    <rect width="12.8861" height="35.9898" transform="matrix(-1 0 0 1 51.9082 16.0264)" fill="white"/>
  </g>
  <g filter="url(#filter0_f_264_111)">
    <ellipse cx="22.452" cy="15.3784" rx="0.821174" ry="0.829553" fill="white"/>
    <ellipse cx="22.452" cy="23.6743" rx="0.821174" ry="0.829553" fill="white"/>
    <ellipse cx="18.1825" cy="19.6928" rx="0.821174" ry="0.829553" fill="white"/>
    <ellipse cx="26.3954" cy="19.6928" rx="0.821174" ry="0.829553" fill="white"/>
    <path d="M23.2745 15.5439C23.4388 17.8667 26.0665 19.194 26.5592 19.0281L26.0665 20.5213C24.2271 20.5213 23.4388 22.7334 23.2745 23.8395H21.6322C21.6322 21.3176 19.5519 20.5766 18.5117 20.5213V19.0281C20.4825 19.0281 21.4132 16.7053 21.6322 15.5439H23.2745Z" fill="white"/>
  </g>
  <g filter="url(#filter1_f_264_111)">
    <ellipse cx="21.6571" cy="39.9956" rx="0.821174" ry="0.829553" fill="white"/>
    <ellipse cx="21.6571" cy="48.2915" rx="0.821174" ry="0.829553" fill="white"/>
    <ellipse cx="17.3876" cy="44.31" rx="0.821174" ry="0.829553" fill="white"/>
    <ellipse cx="25.6005" cy="44.31" rx="0.821174" ry="0.829553" fill="white"/>
    <path d="M22.4796 40.1611C22.6438 42.4839 25.2716 43.8112 25.7643 43.6453L25.2716 45.1385C23.4322 45.1385 22.6438 47.3506 22.4796 48.4567H20.8373C20.8373 45.9348 18.757 45.1938 17.7168 45.1385V43.6453C19.6876 43.6453 20.6183 41.3225 20.8373 40.1611H22.4796Z" fill="white"/>
  </g>
</svg>

    <div style="font-size: 14px; font-weight: 500;">Chat</div>
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

    searchBoxes.forEach((searchBox) =>
      augmentSearchBox(searchBox, detectedCMS === "WordPress")
    );
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
