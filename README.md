# Spellvolt marketing site

A polished React/Vite landing page for `spellvolt.com`, built from the current Spellvolt game identity: neon mage-vs-mage duels, living terrain patches, elemental reactions, Tower mode, LAN/local play, and arcade controls.

## Local development

```bash
cd site
npm install
npm run dev
```

## Production build

```bash
cd site
npm run build
```

The static output is written to `site/dist/`.

## Deploy options

### Vercel / Netlify

Use `site/` as the project root.

- Build command: `npm run build`
- Publish directory: `dist`
- Custom domain: `spellvolt.com`

### GitHub Pages

The build includes `public/CNAME` with `spellvolt.com`, so the generated `dist/CNAME` is ready for GitHub Pages custom-domain hosting. After deploying, point DNS for `spellvolt.com` at the chosen host.
