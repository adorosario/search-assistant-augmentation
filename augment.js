import { CMS_PATTERNS } from './CMS_PATTERNS.js';
(() => {
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
