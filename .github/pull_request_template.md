## Catalog Inclusion Request

Use this template when you want your Claw variant/service to be included in OpenClawIndex.

### 提交方式

1. 推荐：直接在本 PR 中修改 `src/data/catalog.json` 并附上下面的完整信息。
2. 协助录入：如果你不方便改 JSON，也可以在本 PR 里只填写下面表单，维护者会代录入。
3. 多模板扩展（维护者）：可在 `.github/PULL_REQUEST_TEMPLATE/*.md` 增加专用模板（如 `variant.md`、`service.md`）。

### 1) Basic Info

- Project name:
- Kind (`variant` or `service`):
- Category (`Rewrites` / `Security` / `Infrastructure` / `Hosting` / `DesktopHardware` / `Ecosystem` / `SatireFake`):
- Slug (stable, lowercase, kebab-case):
- Status (`open`/`closed`/`unknown`, optional note):

### 2) Required Links

- Website:
- GitHub:
- X/Twitter:

At least one link is required.

### 3) Metrics (optional but recommended)

- GitHub stars (number):
- Claimed speedup:
- Footprint / runtime profile:

### 4) Localized Content (required for all locales)

Please provide all three locales: `zh-CN`, `en`, `ja`.

For each locale, include:

- `name`
- `summary`
- `whatItIs`
- `whatItClaims`
- `whereItShines`
- `limitations`
- `editorialTake`
- `tags` (at least 1)

### 5) Editorial Stance

- recommendation (`recommended` / `neutral` / `not_recommended`):
- confidence (`high` / `medium` / `low`):

### 6) Evidence

- Provide at least one verifiable source URL (official site/repo/post).
- If you provide opinions, they must be traceable to evidence.

### 7) JSON Example (copy and edit)

```json
{
  "id": "variant-yourclaw",
  "slug": "yourclaw",
  "kind": "variant",
  "category": "Rewrites",
  "links": {
    "website": "https://example.com",
    "github": "https://github.com/org/repo",
    "x": "https://x.com/handle"
  },
  "metrics": {
    "stars": 1234,
    "claimedSpeedup": "up to 10x in benchmark X",
    "footprint": "single binary under 10MB"
  },
  "locales": {
    "zh-CN": {
      "name": "YourClaw",
      "summary": "一句话简介",
      "whatItIs": "它是什么",
      "whatItClaims": "它声称什么",
      "whereItShines": "优势场景",
      "limitations": "局限性",
      "editorialTake": "观点层结论",
      "tags": ["tag1", "tag2"]
    },
    "en": {
      "name": "YourClaw",
      "summary": "One-line summary",
      "whatItIs": "What it is",
      "whatItClaims": "What it claims",
      "whereItShines": "Where it shines",
      "limitations": "Limitations",
      "editorialTake": "Editorial take",
      "tags": ["tag1", "tag2"]
    },
    "ja": {
      "name": "YourClaw",
      "summary": "一行要約",
      "whatItIs": "これは何か",
      "whatItClaims": "何を主張するか",
      "whereItShines": "得意領域",
      "limitations": "制約",
      "editorialTake": "編集コメント",
      "tags": ["tag1", "tag2"]
    }
  },
  "stance": {
    "recommendation": "neutral",
    "confidence": "medium"
  },
  "evidence": [
    "https://example.com",
    "https://github.com/org/repo",
    "https://x.com/handle/status/123"
  ],
  "updatedAt": "2026-03-10"
}
```

### 8) Checklist

- [ ] I filled all required schema fields.
- [ ] I provided `zh-CN`, `en`, `ja` localized content.
- [ ] I provided at least one evidence URL.
- [ ] I verified external links are reachable.
- [ ] I ran `npm test` and `npm run build` (if JSON was modified).
