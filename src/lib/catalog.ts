import rawCatalog from '../data/catalog.json';
import {
  catalogSchema,
  isLocale,
  isViewMode,
  LOCALES,
  type CatalogItem,
  type Locale,
  type ViewMode,
} from '../types/catalog';

const parsedCatalog = catalogSchema.parse(rawCatalog);
export const DEFAULT_LOCALE: Locale = 'en';

export type SortField = 'name' | 'category' | 'stars' | 'updatedAt';

export function getAllCatalog(): CatalogItem[] {
  return parsedCatalog;
}

export function getItemsByKind(kind: CatalogItem['kind']): CatalogItem[] {
  return parsedCatalog.filter((item) => item.kind === kind);
}

export function getItemBySlug(slug: string): CatalogItem | undefined {
  return parsedCatalog.find((item) => item.slug === slug);
}

export function getProjectStaticPaths() {
  return parsedCatalog.flatMap((item) =>
    LOCALES.map((locale) => ({
      params: { locale, slug: item.slug },
      props: { item, locale },
    })),
  );
}

export function getLocaleStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export function assertLocale(locale: string | undefined): Locale {
  if (!locale || !isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale ?? 'undefined'}`);
  }
  return locale;
}

export function resolveLocaleFromQuery(value: string | null | undefined): Locale {
  if (value && isLocale(value)) {
    return value;
  }
  return DEFAULT_LOCALE;
}

export function buildLocaleHomepageHref(locale: Locale, query?: string): string {
  const basePath = locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
  if (!query) {
    return basePath;
  }

  const normalizedQuery = query.startsWith('?') ? query.slice(1) : query;
  if (!normalizedQuery) {
    return basePath;
  }

  return `${basePath}?${normalizedQuery}`;
}

export function normalizeViewMode(value: string | null): ViewMode {
  if (!value) {
    return 'facts';
  }
  return isViewMode(value) ? value : 'facts';
}

export function replaceLocaleInPath(pathname: string, targetLocale: Locale): string {
  const chunks = pathname.split('/').filter(Boolean);

  if (chunks.length === 0) {
    return `/${targetLocale}`;
  }

  if (isLocale(chunks[0])) {
    chunks[0] = targetLocale;
    return `/${chunks.join('/')}`;
  }

  return `/${targetLocale}/${chunks.join('/')}`;
}

export function sortByLocalizedName(items: CatalogItem[], locale: Locale) {
  return [...items].sort((a, b) => a.locales[locale].name.localeCompare(b.locales[locale].name));
}

export function getLastUpdatedDate(): string {
  return parsedCatalog.reduce((latest, item) => (item.updatedAt > latest ? item.updatedAt : latest), '');
}
