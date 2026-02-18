import en from '../i18n/messages/en.json';
import ja from '../i18n/messages/ja.json';
import zhCN from '../i18n/messages/zh-CN.json';
import { type Locale } from '../types/catalog';

const messagesByLocale = {
  'zh-CN': zhCN,
  en,
  ja,
} as const;

export type SiteMessages = (typeof messagesByLocale)['en'];

export function getMessages(locale: Locale): SiteMessages {
  return messagesByLocale[locale];
}

export function localeLabel(locale: Locale): string {
  return getMessages(locale).home.localeCards[locale];
}
