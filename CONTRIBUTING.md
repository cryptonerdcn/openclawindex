# Contributing

## Submit Your Claw Entry

Want your Claw variant or related ecosystem service included?

Use the PR template:

- `.github/pull_request_template.md`

### Available submission methods

1. Direct JSON PR (recommended)
Edit `src/data/catalog.json` and include the full entry.

2. Assisted entry PR
Open a PR and fill the template fields without editing JSON; maintainers can add the entry for you.

3. Template specialization (maintainers)
If needed, add more PR templates under `.github/PULL_REQUEST_TEMPLATE/` for different contributor flows.

## Data Requirements (Schema-aligned)

Every entry must include:

- `id`, `slug`, `kind`, `category`
- `links` (at least one of `website`, `github`, `x`)
- `metrics` (optional numeric/text metrics)
- `locales.zh-CN`, `locales.en`, `locales.ja`
- `stance.recommendation`, `stance.confidence`
- `evidence` (at least one URL)
- `updatedAt` (`YYYY-MM-DD`)

## Validation before review

```bash
npm test
npm run build
```
