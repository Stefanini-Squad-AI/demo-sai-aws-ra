import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setLanguage, selectLanguage, type Language } from '~/features/locale/localeSlice';

export const useLocale = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectLanguage);

  const changeLanguage = useCallback(
    (lang: Language) => {
      dispatch(setLanguage(lang));
      i18n.changeLanguage(lang);
    },
    [dispatch, i18n]
  );

  const toggleLanguage = useCallback(() => {
    const newLang: Language = currentLanguage === 'en' ? 'pt-BR' : 'en';
    changeLanguage(newLang);
  }, [currentLanguage, changeLanguage]);

  return {
    language: currentLanguage,
    changeLanguage,
    toggleLanguage,
    isEnglish: currentLanguage === 'en',
    isPortuguese: currentLanguage === 'pt-BR',
  };
};
