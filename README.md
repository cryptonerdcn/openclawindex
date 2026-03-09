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

## Contribution

See `CONTRIBUTING.md` and use `.github/pull_request_template.md` when submitting new claw variants/services.

## Deployment

### GitHub Auto Deploy to Cloudflare Pages

Pushes to `main` trigger `.github/workflows/deploy-cloudflare-pages.yml`.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Once secrets are configured, every commit to `main` is built and deployed to Cloudflare Pages project `openclawindex`.

### Manual Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name openclawindex --branch main
```
