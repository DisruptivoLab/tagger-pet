// next-intl configuration for App Router
export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es';
// Use short, clean URLs without forcing a locale prefix for default locale
export const localePrefix = 'as-needed';

// Default export required by next-intl/plugin (consumed as 'next-intl/config')
export default {
	locales,
	defaultLocale,
	localePrefix
};
