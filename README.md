# OpenClawIndex

Multilingual static directory for OpenClaw variants and related services.

## Features

- Static Astro site (no backend runtime)
- Locales: `zh-CN`, `en`, `ja`
- Dual reading layer: `Facts` and `Opinions`
- Data-driven catalog from `src/data/catalog.json`
- Typed schema validation with Zod
- Dynamic static routes for:
  - `/[locale]/variants`
  - `/[locale]/services`
  - `/[locale]/project/[slug]`
  - `/[locale]/methodology`
  - `/[locale]/changelog`

## Content Model

Core types and schema live in:

- `src/types/catalog.ts`
- `src/data/catalog.json`
- `src/i18n/messages/*.json`

## Development

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

## Verification

```bash
npm test
npm run build
npx astro check
```

## Deployment

This project is built as static output and can be deployed directly to Cloudflare Pages or Vercel using:

```bash
npm run build
```

Artifacts are generated in `dist/`.
