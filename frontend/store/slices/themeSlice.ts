import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeConfig } from '@/types';

interface ThemeState extends ThemeConfig {
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: 'system',
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  accentColor: '#10b981',
  borderRadius: 'md',
  animations: true,
  systemTheme: 'light',
  effectiveTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.mode = action.payload;
      state.effectiveTheme = action.payload === 'system' ? state.systemTheme : action.payload;
    },
    setSystemTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.systemTheme = action.payload;
      if (state.mode === 'system') {
        state.effectiveTheme = action.payload;
      }
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondaryColor = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.accentColor = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<'none' | 'sm' | 'md' | 'lg' | 'xl'>) => {
      state.borderRadius = action.payload;
    },
    setAnimations: (state, action: PayloadAction<boolean>) => {
      state.animations = action.payload;
    },
    updateThemeConfig: (state, action: PayloadAction<Partial<ThemeConfig>>) => {
      Object.assign(state, action.payload);
      if (state.mode === 'system') {
        state.effectiveTheme = state.systemTheme;
      } else {
        state.effectiveTheme = state.mode;
      }
    },
    resetTheme: () => initialState,
  },
});

export const {
  setThemeMode,
  setSystemTheme,
  setPrimaryColor,
  setSecondaryColor,
  setAccentColor,
  setBorderRadius,
  setAnimations,
  updateThemeConfig,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;

// Selectors
export const selectTheme = (state: { theme: ThemeState }) => state.theme;
export const selectEffectiveTheme = (state: { theme: ThemeState }) => state.theme.effectiveTheme;
export const selectThemeMode = (state: { theme: ThemeState }) => state.theme.mode;
export const selectAnimationsEnabled = (state: { theme: ThemeState }) => state.theme.animations;
export const selectThemeColors = (state: { theme: ThemeState }) => ({
  primary: state.theme.primaryColor,
  secondary: state.theme.secondaryColor,
  accent: state.theme.accentColor,
});