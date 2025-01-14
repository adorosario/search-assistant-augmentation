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
      display: inline-block !important;
      width: 100% !important;
      z-index: 99999 !important;
    }
    .${NAMESPACE}-wrapper input {
      width: 100% !important;
      position: relative !important;
      z-index: 1 !important;
    }
    .${NAMESPACE}-icon {
      position: absolute !important;
      right: 10px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      cursor: pointer !important;
      padding: 5px !important;
      z-index: 2 !important;
      background: transparent !important;
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

    const dropdown = document.createElement("div");
    dropdown.className = `${NAMESPACE}-dropdown`;
    wrapper.appendChild(dropdown);

    const searchHandler = debounce(async (e) => {
      const query = e.target.value;
      if (query.length >= 2) {
        try {
          const results = await performSearch(query);
          updateDropdown(dropdown, results);
          dropdown.classList.add("active");
        } catch (error) {
          console.error("Search error:", error);
        }
      } else {
        dropdown.classList.remove("active");
      }
    }, 300);

    searchBox.addEventListener("input", searchHandler);

    searchBox.addEventListener("focus", () => {
      wrapper.style.zIndex = "99999";
      if (searchBox.value.length >= 2) {
        dropdown.classList.add("active");
      }
    });

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });

    // Keyboard navigation
    searchBox.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdown.classList.remove("active");
      }
    });
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  async function performSearch(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: "Result 1 from customGpt Ai",
            url: "https://researcher.customgpt.ai/",
          },
          { title: "Result 2 from Open Ai", url: "https://chatgpt.com/" },
          { title: "Result 3 from Claude Ai", url: "https://claude.ai" },
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

  function findSearchBoxes(document, detectedCMS) {
    const searchBoxes = [];
    const cmsPatterns =
      detectedCMS !== "Unknown" ? CMS_PATTERNS[detectedCMS].searchPatterns : [];

    if (cmsPatterns.length > 0) {
      cmsPatterns.forEach((pattern) => {
        const elements = document.querySelectorAll(pattern);
        elements.forEach((el) => {
          if (!el.hasAttribute("data-augmented")) {
            searchBoxes.push({
              element: el,
              type: el.getAttribute("type") || "text",
              pattern: pattern,
              cms: detectedCMS,
              isDefault: true,
            });
          }
        });
      });
    }

    if (searchBoxes.length === 0) {
      const inputs = document.querySelectorAll("input:not([data-augmented])");
      inputs.forEach((input) => {
        const type = input.getAttribute("type")?.toLowerCase() || "";
        const placeholder =
          input.getAttribute("placeholder")?.toLowerCase() || "";
        const name = input.getAttribute("name")?.toLowerCase() || "";
        const className = input.className.toLowerCase();

        if (
          type === "search" ||
          placeholder.includes("search") ||
          name.includes("search") ||
          className.includes("search")
        ) {
          searchBoxes.push({
            element: input,
            type: type || "text",
            placeholder: placeholder,
            isDefault: false,
            cms: "Generic",
          });
        }
      });
    }

    return searchBoxes;
  }

  function detectAndAugmentSite() {
    // Remove any existing augmentation
    const existingStyles = document.getElementById(`${NAMESPACE}-styles`);
    if (existingStyles) {
      existingStyles.remove();
    }

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

    const searchBoxes = findSearchBoxes(document, detectedCMS);
    searchBoxes.forEach((searchBox) => {
      augmentSearchBox(searchBox.element);
    });

    // Setup mutation observer to handle dynamically added search boxes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // ELEMENT_NODE
            const newSearchBoxes = findSearchBoxes(node, detectedCMS);
            newSearchBoxes.forEach((searchBox) => {
              augmentSearchBox(searchBox.element);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    console.log("Detected CMS:", detectedCMS);
    console.log("Search Boxes Augmented:", searchBoxes);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", detectAndAugmentSite);
  } else {
    detectAndAugmentSite();
  }
})();
