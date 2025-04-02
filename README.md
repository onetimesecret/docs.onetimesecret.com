# Onetime Secret Documentation Site

This is the documentation site for [Onetime Secret](https://onetimesecret.com/), a secure way to share sensitive information that's automatically destroyed after it's read.

[![Built with Starlight](https://astro.badgen.net/badge/built%20with/Starlight/purple)](https://starlight.astro.build)

## Features

- Full documentation for Onetime Secret
- Multilingual support (currently English and German)
- Custom components for card layouts
- Responsive design

## Setup

Make sure to install the dependencies:

```bash
# From the project root
pnpm install
```

## Development Server

Start the development server:

```bash
# From the project root
pnpm dev
```

This will start Astro's development server, and you can view the site at `http://localhost:4321`.

## Building for Production

Build the application for production:

```bash
# From the project root
pnpm build
```

The built files will be in the `dist` directory.

## Project Structure

```
docs/                     # Project root
├── src/                  # Source directory
│   ├── assets/           # Assets including images
│   ├── components/       # Astro components
│   │   ├── CardGrid.astro        # Grid layout for cards
│   │   ├── FeatureCard.astro     # Card components
│   │   └── starlight/            # Starlight component customizations
│   ├── content/          # Documentation content
│   │   ├── docs/         # All documentation
│   │   │   ├── en/       # English content
│   │   │   └── de_AT/    # German content
│   │   └── i18n/         # Translation files
│   └── styles/           # CSS styles
├── astro.config.mjs      # Astro/Starlight configuration
├── markdoc.config.mjs    # Markdoc component configuration
└── public/               # Static files
```

## Contributing

Contributions to documentation are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This documentation site is licensed under the MIT License.
