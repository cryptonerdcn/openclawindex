# Contributing

## Submit Your Claw Entry

Want your Claw variant or related ecosystem service included?

Use GitHub Issues first:

- `.github/ISSUE_TEMPLATE/submit-claw-entry.yml`
- `.github/ISSUE_TEMPLATE/suggest-project.md`

### Available submission methods

1. Structured Issue form (recommended)
Open issue `Submit Claw Entry` and fill schema-aligned fields.

2. Quick suggestion issue
Open issue `Quick Project Suggestion` with minimal details; maintainers can follow up.

3. Direct JSON PR (advanced)
Open a PR and edit `src/data/catalog.json` directly. You can still use `.github/pull_request_template.md`.

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
