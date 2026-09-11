import { useTranslation } from 'react-i18next';
import { Type, ALL_TYPES, TYPE_NAMES_EN, TYPE_NAMES_JP, getMultipliers, GameMode } from '../data/typeData';
import TypeBadge from './TypeBadge';
import MultiplierCard from './MultiplierCard';
import InstallPrompt from './InstallPrompt';

interface HomeScreenProps {
  selectedType: Type;
  onTypeChange: (type: Type) => void;
  onStartQuiz: () => void;
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
}

export default function HomeScreen({
  selectedType,
  onTypeChange,
  onStartQuiz,
  gameMode,
  onGameModeChange,
}: HomeScreenProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'en' | 'jp';

  const getTypeName = (type: Type) => {
    return language === 'jp' ? TYPE_NAMES_JP[type] : TYPE_NAMES_EN[type];
  };

  const multipliers = getMultipliers(gameMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {t('app.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('app.description')}
          </p>
        </div>

        {/* Game Mode Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('home.gameMode')}
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => onGameModeChange('gen6')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                gameMode === 'gen6'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('home.gameMode.gen6')}
            </button>
            <button
              onClick={() => onGameModeChange('go')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                gameMode === 'go'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('home.gameMode.go')}
            </button>
          </div>
        </div>

        {/* Type Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('home.selectType')}
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as Type)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {ALL_TYPES.map((type) => (
              <option key={type} value={type}>
                {getTypeName(type)}
              </option>
            ))}
          </select>
        </div>

        {/* Preview Selected Type Badge */}
        <div className="flex justify-center mb-6">
          <TypeBadge type={selectedType} size="lg" />
        </div>

        {/* Start Quiz Button */}
        <button
          onClick={onStartQuiz}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl mb-6"
        >
          {t('home.startQuiz')}
        </button>

        {/* Install Prompt */}
        <div className="flex justify-center mb-6">
          <InstallPrompt />
        </div>

        {/* Multiplier Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('quiz.multiplier')}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {multipliers.map((multiplier) => (
              <MultiplierCard
                key={multiplier}
                multiplier={multiplier}
                disabled
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
