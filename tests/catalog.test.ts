import { describe, expect, it } from 'vitest';

import rawCatalog from '../src/data/catalog.json';
import enMessages from '../src/i18n/messages/en.json';
import {
  catalogSchema,
  CATEGORIES,
  LOCALES,
  VIEW_MODES,
  type CatalogItem,
  type Locale,
  type ViewMode,
} from '../src/types/catalog';
import {
  buildLocaleHomepageHref,
  getAllCatalog,
  getItemsByKind,
  getProjectStaticPaths,
  normalizeViewMode,
  resolveLocaleFromQuery,
  replaceLocaleInPath,
} from '../src/lib/catalog';

describe('catalog schema', () => {
  it('parses full catalog with strict validation', () => {
    const parsed = catalogSchema.parse(rawCatalog);
    expect(parsed.length).toBeGreaterThan(8);
  });

  it('forces evidence source for every item', () => {
    const parsed = catalogSchema.parse(rawCatalog);
    for (const item of parsed) {
      expect(item.evidence.length).toBeGreaterThan(0);
    }
  });

  it('includes all required locale payloads', () => {
    const parsed = catalogSchema.parse(rawCatalog);
    for (const item of parsed) {
      for (const locale of LOCALES) {
        expect(item.locales[locale].name.length).toBeGreaterThan(0);
        expect(item.locales[locale].whatItIs.length).toBeGreaterThan(0);
        expect(item.locales[locale].editorialTake.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('homepage copy', () => {
  it('keeps english homepage title within five words', () => {
    const words = enMessages.home.title.trim().split(/\s+/).filter(Boolean);
    expect(words.length).toBeLessThanOrEqual(5);
  });
});

describe('catalog helpers', () => {
  it('contains original core variants', () => {
    const variants = getItemsByKind('variant');
    const slugs = new Set(variants.map((item) => item.slug));
    expect(slugs.has('nanobot')).toBe(true);
    expect(slugs.has('picoclaw')).toBe(true);
    expect(slugs.has('zeroclaw')).toBe(true);
    expect(slugs.has('nanoclaw')).toBe(true);
    expect(slugs.has('ironclaw')).toBe(true);
    expect(slugs.has('tinyclaw')).toBe(true);
    expect(slugs.has('safeclaw')).toBe(true);
  });

  it('returns service entries as non-empty', () => {
    const services = getItemsByKind('service');
    expect(services.length).toBeGreaterThan(0);
  });

  it('includes newly curated projects', () => {
    const allItems = getAllCatalog();
    const slugs = new Set(allItems.map((item) => item.slug));
    expect(slugs.has('moltbook')).toBe(true);
    expect(slugs.has('mimiclaw')).toBe(true);
    expect(slugs.has('kimiclaw')).toBe(true);
    expect(slugs.has('clawlet')).toBe(true);
    expect(slugs.has('nullclaw')).toBe(true);
    expect(slugs.has('mistermorph')).toBe(true);
  });

  it('builds project static paths across locales and slugs', () => {
    const catalog = getAllCatalog();
    const paths = getProjectStaticPaths();
    expect(paths.length).toBe(catalog.length * LOCALES.length);
  });

  it('normalizes invalid view mode to facts', () => {
    expect(normalizeViewMode('opinions')).toBe('opinions');
    expect(normalizeViewMode('facts')).toBe('facts');
    expect(normalizeViewMode('')).toBe('facts');
    expect(normalizeViewMode('oops')).toBe('facts');
  });

  it('replaces locale segment while preserving subpath', () => {
    const changed = replaceLocaleInPath('/zh-CN/project/nanobot', 'ja');
    expect(changed).toBe('/ja/project/nanobot');
  });

  it('defaults locale query to english', () => {
    expect(resolveLocaleFromQuery(null)).toBe('en');
    expect(resolveLocaleFromQuery('')).toBe('en');
    expect(resolveLocaleFromQuery('unknown')).toBe('en');
    expect(resolveLocaleFromQuery('ja')).toBe('ja');
  });

  it('builds locale homepage href with english root and preserves query', () => {
    expect(buildLocaleHomepageHref('en')).toBe('/');
    expect(buildLocaleHomepageHref('zh-CN')).toBe('/zh-CN/');
    expect(buildLocaleHomepageHref('ja')).toBe('/ja/');
    expect(buildLocaleHomepageHref('en', 'view=opinions')).toBe('/?view=opinions');
    expect(buildLocaleHomepageHref('ja', 'view=opinions&q=nanobot')).toBe('/ja/?view=opinions&q=nanobot');
  });

  it('exposes stable enums used by UI controls', () => {
    expect(CATEGORIES).toContain('SatireFake');
    expect(VIEW_MODES).toEqual(['facts', 'opinions']);
  });

  it('exports type-safe locale and view mode literals', () => {
    const locale: Locale = 'en';
    const view: ViewMode = 'facts';
    const item = getAllCatalog()[0] as CatalogItem;
    expect(item.locales[locale].name.length).toBeGreaterThan(0);
    expect(view).toBe('facts');
  });
});
