export type ThemeMode = 'system' | 'light' | 'dark';
export type AppLanguage = 'en' | 'jp';

export const THEME_STORAGE_KEY = 'pokemon-quiz-theme';
export const LANGUAGE_STORAGE_KEY = 'pokemon-quiz-language';
export const GAME_MODE_STORAGE_KEY = 'pokemon-quiz-game-mode';
export const QUIZ_MODE_STORAGE_KEY = 'pokemon-quiz-quiz-mode';

export const THEME_MODES: readonly ThemeMode[] = ['system', 'light', 'dark'];

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function isAppLanguage(value: unknown): value is AppLanguage {
  return value === 'en' || value === 'jp';
}

export function getBrowserLanguage(): AppLanguage {
  try {
    const browserLang = (navigator.language ?? '').toLowerCase();
    if (browserLang.startsWith('ja')) return 'jp';
  } catch {
    // navigator unavailable
  }
  return 'en';
}

export function readStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeMode(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, restricted iframe)
  }
  return 'system';
}

export function readStoredLanguage(): AppLanguage {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isAppLanguage(stored)) return stored;
  } catch {
    // localStorage unavailable
  }
  return getBrowserLanguage();
}

export function persistTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // localStorage unavailable
  }
}

export function persistLanguage(language: AppLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // localStorage unavailable
  }
}

export function cycleTheme(mode: ThemeMode): ThemeMode {
  const index = THEME_MODES.indexOf(mode);
  return THEME_MODES[(index + 1) % THEME_MODES.length];
}

export function isSystemPreferringDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyThemeClass(mode: ThemeMode): void {
  const prefersDark = mode === 'system' ? isSystemPreferringDark() : mode === 'dark';
  document.documentElement.classList.toggle('dark', prefersDark);
}
