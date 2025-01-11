(() => {
  const CMS_PATTERNS = {
    WordPress: {
      signatures: ['wp-content', 'wp-includes', 'generator" content="wordpress'],
      searchPatterns: [
        'input[name="s"]',
        '.search-field',
        'form[role="search"] input',
        'input.wp-block-search__input',
        '.wp-search-form input',
      ],
    },
    Webflow: {
      signatures: ['webflow.js', 'generator" content="webflow', 'w-nav'],
      searchPatterns: [
        '.w-form-input[type="search"]',
        '.search-input',
        '[data-search-input]',
      ],
    },
    Docusaurus: {
      signatures: ['generator" content="docusaurus', 'docusaurus.config', 'docs-doc-page'],
      searchPatterns: [
        '.DocSearch-Input',
        '.DocSearch-Button',
        '#docsearch-input',
        '.navbar__search-input',
      ],
    },
    GitBook: {
      signatures: ['generator" content="gitbook', 'gitbook.js', 'gitbook-plugin'],
      searchPatterns: [
        '.book-search-input',
        '.gitbook-search-input',
        '.searchbox input',
      ],
    },
    Zendesk: {
      signatures: ['zendesk-widget', 'zendesk_app_framework', '/hc/en-us/'],
      searchPatterns: [
        '.search-query',
        '#query',
        '.hc-search-input',
        'input[name="query"]',
      ],
    },
  };

  function findSearchBoxes(document, detectedCMS) {
    const searchBoxes = [];
    const cmsPatterns = detectedCMS !== 'Unknown' ? CMS_PATTERNS[detectedCMS].searchPatterns : [];

    if (cmsPatterns.length > 0) {
      cmsPatterns.forEach((pattern) => {
        const elements = document.querySelectorAll(pattern);
        elements.forEach((el) => {
          searchBoxes.push({
            type: el.getAttribute('type') || 'text',
            pattern: pattern,
            cms: detectedCMS,
            isDefault: true,
          });
        });
      });
    }

    if (searchBoxes.length === 0) {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        const type = input.getAttribute('type')?.toLowerCase() || '';
        const placeholder = input.getAttribute('placeholder')?.toLowerCase() || '';
        const name = input.getAttribute('name')?.toLowerCase() || '';
        const className = input.className.toLowerCase();

        if (
          type === 'search' ||
          placeholder.includes('search') ||
          name.includes('search') ||
          className.includes('search')
        ) {
          searchBoxes.push({
            type: type || 'text',
            placeholder: placeholder,
            isDefault: false,
            cms: 'Generic',
          });
        }
      });
    }

    return searchBoxes;
  }

  function detectSite() {
    const html = document.documentElement.innerHTML;
    let detectedCMS = 'Unknown';

    for (const [cms, config] of Object.entries(CMS_PATTERNS)) {
      if (config.signatures.some((sign) => html.toLowerCase().includes(sign.toLowerCase()))) {
        detectedCMS = cms;
        break;
      }
    }

    const searchBoxes = findSearchBoxes(document, detectedCMS);

    console.log('Detected CMS:', detectedCMS);
    console.log('Search Boxes Found:', searchBoxes);
  }

  detectSite();
})();
