# Learning Brains

This is the official repository for the **Learning Brains** project website, an Erasmus+ funded initiative focused on industrial reskilling.

## Project Structure

- `src/`: Source code for the React application
- `public/`: Static assets (logos, images, etc.)
- `scripts/`: Production & automation scripts (Sitemap, Sync, Translations)
- `tools/`: Development utilities and legacy session scripts
- `src/locales/`: Internationalization files (en, es, sk, it, de, pt)
- `src/pages/`: Page components
- `src/components/`: Reusable components

## Features

- 🌍 **Multi-language support**: English, Spanish, Slovak, Italian, German, Portuguese
- 📱 **Responsive design**: Mobile-first approach with Tailwind CSS
- ⚡ **Fast performance**: Built with Vite and React
- 🎨 **Modern UI**: Clean, professional design following Erasmus+ guidelines

## Development

To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Build & Prerender

To build the project and generate static pages for SEO:

```bash
npm run build
```

## Content Synchronization

The website's news content is managed via a Google Spreadsheet. To sync the latest content:

```bash
# Fetches data from spreadsheet and updates all localizations
node scripts/sync-news-excel.cjs
```

The script performs the following:
1. Fetches data from the project spreadsheet.
2. Cleans technical boilerplate and metadata.
3. Automatically translates new content into 5 other languages using OpenAI GPT-4o.
4. Generates stable slugs based on English titles.

## Deployment

The project is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

## Project Information

- **Programme**: Erasmus+ KA220-VET
- **Duration**: 24 Months
- **Coordinator**: FVEM (Spain)
- **Partners**: 6 organizations across Europe
