export const CMS_PATTERNS = {
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
