import { useTranslation } from 'react-i18next';
import { ALL_TYPES, Type } from '../data/typeData';
import { TYPE_NAMES_EN, TYPE_NAMES_JP } from '../data/typeData';

interface HomeScreenProps {
  selectedType: Type;
  onTypeChange: (type: Type) => void;
  onStartQuiz: () => void;
}

export default function HomeScreen({ selectedType, onTypeChange, onStartQuiz }: HomeScreenProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'en' | 'jp';
  
  const getTypeName = (type: Type) => {
    return language === 'jp' ? TYPE_NAMES_JP[type] : TYPE_NAMES_EN[type];
  };

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
        
        {/* Type Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
        
        {/* Start Quiz Button */}
        <button
          onClick={onStartQuiz}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {t('home.startQuiz')}
        </button>
        
        {/* Types Grid Preview */}
        <div className="mt-8 grid grid-cols-6 gap-2">
          {ALL_TYPES.map((type) => (
            <div
              key={type}
              className="type-badge text-xs text-center py-1"
              style={{ backgroundColor: `var(--type-${type})` }}
            >
              {getTypeName(type)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
