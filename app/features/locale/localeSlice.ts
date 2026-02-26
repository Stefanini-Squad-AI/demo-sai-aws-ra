import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '~/store/store';

export type Language = 'en' | 'pt-BR';

interface LocaleState {
  language: Language;
  isInitialized: boolean;
}

const STORAGE_KEY = 'sai-language';

// Load language from localStorage or default to 'en'
const loadLanguageFromStorage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'pt-BR') {
      return stored;
    }
  } catch (error) {
    console.error('Failed to load language from localStorage:', error);
  }
  return 'en';
};

const initialState: LocaleState = {
  language: loadLanguageFromStorage(),
  isInitialized: false,
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      state.isInitialized = true;
      
      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, action.payload);
      } catch (error) {
        console.error('Failed to save language to localStorage:', error);
      }
    },
    initializeLocale: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setLanguage, initializeLocale } = localeSlice.actions;

// Selectors
export const selectLanguage = (state: RootState): Language => state.locale.language;
export const selectIsLocaleInitialized = (state: RootState): boolean => state.locale.isInitialized;

export default localeSlice.reducer;
