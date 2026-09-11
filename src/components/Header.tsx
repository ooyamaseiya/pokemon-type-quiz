import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, LogOut } from 'lucide-react';
import { ThemeMode } from '../App';
import { Type, TYPE_NAMES_EN, TYPE_NAMES_JP } from '../data/typeData';

interface HeaderProps {
  isQuizMode: boolean;
  onExit: () => void;
  attackerType?: Type;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  language: 'en' | 'jp';
  onLanguageChange: (lang: 'en' | 'jp') => void;
}

export default function Header({
  isQuizMode,
  onExit,
  attackerType,
  themeMode,
  onThemeChange,
  language,
  onLanguageChange,
}: HeaderProps) {
  const { t } = useTranslation();
  
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === 'dark') {
      html.classList.add('dark');
    } else if (themeMode === 'light') {
      html.classList.remove('dark');
    } else {
      // System preference - check prefers-color-scheme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }, [themeMode]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isQuizMode && attackerType && (
            <span
              className="type-badge text-white px-4 py-2"
              style={{ backgroundColor: `var(--type-${attackerType})` }}
            >
              {language === 'jp' ? TYPE_NAMES_JP[attackerType] : TYPE_NAMES_EN[attackerType]}
            </span>
          )}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {t('app.title')}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => onThemeChange('system')}
              className={`px-2 py-1 text-xs ${themeMode === 'system' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
              title={t('theme.system')}
            >
              <Globe size={14} />
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`px-2 py-1 text-xs ${themeMode === 'dark' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
              title={t('theme.dark')}
            >
              <Moon size={14} />
            </button>
            <button
              onClick={() => onThemeChange('light')}
              className={`px-2 py-1 text-xs ${themeMode === 'light' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
              title={t('theme.light')}
            >
              <Sun size={14} />
            </button>
          </div>
          
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'jp' : 'en')}
            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            {language === 'en' ? 'EN' : 'JP'}
          </button>
          
          {/* Exit Button */}
          {isQuizMode && (
            <button
              onClick={onExit}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              {t('quiz.exit')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
