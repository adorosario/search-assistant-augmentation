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
        ".book-search-input",
        ".gitbook-search-input",
        ".searchbox input",
        "#search-input",
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
        "wp-content",
        "wp-includes",
        'generator" content="wordpress',
        "wp-json",
        'class="wp-',
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
  const STYLES = `
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
      background: #007bff !important;
      color: white !important;
      border: none !important;
      border-radius: 4px !important;
      cursor: pointer !important;
    }
    .${NAMESPACE}-button:hover {
      background: #0056b3 !important;
    }
    .${NAMESPACE}-dropdown {
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      width: 100% !important;
      background: white !important;
      border: 1px solid #ddd !important;
      border-radius: 4px !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      z-index: 99999 !important;
      display: none !important;
      margin-top: 5px !important;
    }
    .${NAMESPACE}-dropdown.active {
      display: block !important;
    }
    .${NAMESPACE}-result {
      padding: 8px 12px !important;
      cursor: pointer !important;
      transition: background-color 0.2s !important;
    }
    .${NAMESPACE}-result:hover {
      background-color: #f5f5f5 !important;
    }
  `;

  function injectStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.id = `${NAMESPACE}-styles`;
    styleSheet.textContent = STYLES;
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
    aiButton.textContent = "AI";
    wrapper.appendChild(aiButton);

    const dropdown = document.createElement("div");
    dropdown.className = `${NAMESPACE}-dropdown`;
    wrapper.appendChild(dropdown);

    aiButton.addEventListener("click", async () => {
      if (dropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
      } else {
        try {
          const results = await performSearch("ai");
          updateDropdown(dropdown, results);
          dropdown.classList.add("active");
        } catch (error) {
          console.error("Search error:", error);
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }

  async function performSearch(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: "Result 1 from customGpt AI",
            url: "https://researcher.customgpt.ai/",
          },
          { title: "Result 2 from OpenAI", url: "https://chatgpt.com/" },
          { title: "Result 3 from Claude AI", url: "https://claude.ai" },
        ]);
      }, 100);
    });
  }

  function updateDropdown(dropdown, results) {
    dropdown.innerHTML = results
      .map(
        (result) => `
        <div class="${NAMESPACE}-result">
          <a href="${result.url}" style="display: block !important; text-decoration: none !important; color: #000 !important;">
            ${result.title}
          </a>
        </div>
      `
      )
      .join("");
  }

  function detectAndAugmentSite() {
    const html = document.documentElement.innerHTML;
    let detectedCMS = "Unknown";

    for (const [cms, config] of Object.entries(CMS_PATTERNS)) {
      if (
        config.signatures.some((sign) =>
          html.toLowerCase().includes(sign.toLowerCase())
        )
      ) {
        detectedCMS = cms;
        break;
      }
    }

    injectStyles();

    const searchBoxes = document.querySelectorAll(
      "input[type='text'], input[type='search']"
    );
    searchBoxes.forEach((searchBox) => augmentSearchBox(searchBox));
    console.log("Detected CMS:", detectedCMS);
    console.log("Search Boxes Augmented:", searchBoxes);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", detectAndAugmentSite);
  } else {
    detectAndAugmentSite();
  }
})();
