import type { Language } from '~/features/locale/localeSlice';

/**
 * Maps application language codes to Intl locale codes
 */
export const getIntlLocale = (language: Language): string => {
  const localeMap: Record<Language, string> = {
    'en': 'en-US',
    'pt-BR': 'pt-BR',
  };
  return localeMap[language];
};

/**
 * Gets the currency code for a given language
 */
export const getCurrencyCode = (language: Language): string => {
  const currencyMap: Record<Language, string> = {
    'en': 'USD',
    'pt-BR': 'BRL',
  };
  return currencyMap[language];
};
