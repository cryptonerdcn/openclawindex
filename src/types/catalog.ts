import { z } from 'zod';

export const LOCALES = ['zh-CN', 'en', 'ja'] as const;
export const VIEW_MODES = ['facts', 'opinions'] as const;
export const CATEGORIES = [
  'Rewrites',
  'Security',
  'Infrastructure',
  'Hosting',
  'DesktopHardware',
  'Ecosystem',
  'SatireFake',
] as const;

export type Locale = (typeof LOCALES)[number];
export type ViewMode = (typeof VIEW_MODES)[number];
export type Category = (typeof CATEGORIES)[number];

const localizedContentSchema = z.object({
  name: z.string().min(1),
  summary: z.string().min(1),
  whatItIs: z.string().min(1),
  whatItClaims: z.string().min(1),
  whereItShines: z.string().min(1),
  limitations: z.string().min(1),
  editorialTake: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
});

const evidenceUrlSchema = z.string().url();

export const catalogItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  kind: z.enum(['variant', 'service']),
  category: z.enum(CATEGORIES),
  links: z
    .object({
      website: z.string().url().optional(),
      github: z.string().url().optional(),
      x: z.string().url().optional(),
    })
    .refine((links) => Object.values(links).some(Boolean), {
      message: 'At least one link is required',
    }),
  metrics: z.object({
    stars: z.number().int().nonnegative().optional(),
    claimedSpeedup: z.string().min(1).optional(),
    footprint: z.string().min(1).optional(),
  }),
  locales: z.object({
    'zh-CN': localizedContentSchema,
    en: localizedContentSchema,
    ja: localizedContentSchema,
  }),
  stance: z.object({
    recommendation: z.enum(['recommended', 'neutral', 'not_recommended']),
    confidence: z.enum(['high', 'medium', 'low']),
  }),
  evidence: z.array(evidenceUrlSchema).min(1),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const catalogSchema = z.array(catalogItemSchema).superRefine((items, ctx) => {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const item of items) {
    if (ids.has(item.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate id: ${item.id}`,
      });
    }
    if (slugs.has(item.slug)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate slug: ${item.slug}`,
      });
    }

    ids.add(item.id);
    slugs.add(item.slug);
  }
});

export type LocalizedContent = z.infer<typeof localizedContentSchema>;
export type CatalogItem = z.infer<typeof catalogItemSchema>;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isViewMode(value: string): value is ViewMode {
  return (VIEW_MODES as readonly string[]).includes(value);
}
