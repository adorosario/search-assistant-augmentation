# Universal Search Box Augmentation Script

A lightweight, drop-in JavaScript solution that automatically detects and enhances search functionality across various Content Management Systems (CMS) and documentation platforms.

## Features

- 🔍 **Automatic CMS Detection**: Identifies popular platforms including:
  - WordPress
  - Webflow
  - Docusaurus
  - GitBook
  - Zendesk
  - And more...

- 🎯 **Intelligent Search Box Detection**: Locates and identifies search interfaces across different platforms using specialized patterns and heuristics

- 🪄 **Zero Configuration**: Works out of the box with a single line of code

- 🔌 **Platform Agnostic**: Compatible with major documentation and marketing platforms

## Live Demo

[https://adorosario.github.io/search-assistant-augmentation/tester.html](https://adorosario.github.io/search-assistant-augmentation/tester.html)

## Quick Start

Add the script to your website by including this single line in your footer or before the closing `</body>` tag:

```html
<script src="https://adorosario.github.io/search-assistant-augmentation/augment.js"></script>
```

Or via Google Tag Manager:

1. Create a new Custom HTML tag
2. Add the script code
3. Set trigger to fire on all pages
4. Publish your container

## How It Works

The script follows a three-step process:

1. **CMS Detection**: Uses signature patterns to identify the underlying CMS platform
2. **Search Box Location**: Employs platform-specific selectors to find search interfaces
3. **Enhancement**: Augments detected search boxes with AI capabilities while maintaining original functionality

## Supported Platforms

### Documentation Platforms
- Docusaurus
- GitBook
- MkDocs
- VuePress

### Marketing Sites
- WordPress
- Webflow
- Gatsby
- Framer

### Help Centers
- Zendesk
- Discord
- Slack

## Development

### Prerequisites

- Modern web browser
- Basic understanding of JavaScript and DOM manipulation

### Local Testing

1. Clone the repository:
```bash
git clone https://github.com/adorosario/search-augmentation.git
```

2. Open `tester.html` in your browser to use the testing interface

3. Enter any website URL to analyze its CMS and search box implementation

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Adding Support for New Platforms

1. Add platform signatures to `CMS_PATTERNS`
2. Define search box patterns for the platform
3. Test thoroughly with example sites
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details

## Support

- 🐛 [Issue Tracker](https://github.com/adorosario/search-augmentation/issues)

## Credits

Developed with ❤️  by [adorosario](https://github.com/adorosario/) and [oussama-ibrahim](https://github.com/oussama-ibrahim)
