import { useTranslation } from 'react-i18next';
import { Moon, Monitor, Sun, LogOut } from 'lucide-react';
import { ThemeMode } from '../App';
import { AppLanguage } from '../utils/settings';
import { cycleTheme } from '../utils/settings';
import { Type, TYPE_NAMES_EN, TYPE_NAMES_JP } from '../data/typeData';

interface HeaderProps {
  isQuizMode: boolean;
  onExit: () => void;
  attackerType?: Type;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
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

  const ThemeIcon = themeMode === 'system' ? Monitor : themeMode === 'light' ? Sun : Moon;
  const themeLabel = t(`theme.${themeMode}`);

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
          {/* Theme Toggle - single icon button cycling system -> light -> dark -> system */}
          <button
            type="button"
            onClick={() => onThemeChange(cycleTheme(themeMode))}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title={themeLabel}
            aria-label={themeLabel}
          >
            <ThemeIcon size={16} aria-hidden="true" />
          </button>
          
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
