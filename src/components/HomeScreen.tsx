import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ALL_TYPES, GameMode, TYPE_NAMES_EN, TYPE_NAMES_JP, Type } from '../data/typeData';
import { QUIZ_MODES, QuizMode } from '../types/quiz';
import { AppLanguage } from '../utils/settings';
import InstallPrompt from './InstallPrompt';
import TypeBadge from './TypeBadge';

interface HomeScreenProps {
  selectedType: Type;
  onTypeChange: (type: Type) => void;
  onStartQuiz: () => void;
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  quizMode: QuizMode;
  onQuizModeChange: (mode: QuizMode) => void;
  mistakeCount: number;
}

export default function HomeScreen({
  selectedType,
  onTypeChange,
  onStartQuiz,
  gameMode,
  onGameModeChange,
  quizMode,
  onQuizModeChange,
  mistakeCount,
}: HomeScreenProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as AppLanguage;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingType, setPendingType] = useState<Type | null>(null);
  const [noQuestionsOpen, setNoQuestionsOpen] = useState(false);

  useEffect(() => {
    if (!noQuestionsOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNoQuestionsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [noQuestionsOpen]);

  const getTypeName = (type: Type) => {
    return language === 'jp' ? TYPE_NAMES_JP[type] : TYPE_NAMES_EN[type];
  };

  // const multipliers = getMultipliers(gameMode);

  const handleTypeCardClick = (type: Type) => {
    if (quizMode === 'mistakes' && mistakeCount === 0) return;
    setPendingType(type);
    setConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingType) {
      onTypeChange(pendingType);
      onStartQuiz();
    }
    setConfirmDialogOpen(false);
    setPendingType(null);
  };

  const handleCancel = () => {
    setConfirmDialogOpen(false);
    setPendingType(null);
  };

  const handleQuizModeSelect = (mode: QuizMode) => {
    if (mode === 'mistakes') {
      if (mistakeCount >= 1) {
        onQuizModeChange('mistakes');
        onStartQuiz();
      } else {
        setNoQuestionsOpen(true);
      }
      return;
    }
    onQuizModeChange(mode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {t('app.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('app.description')}
          </p>
        </div> */}

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

        {/* Quiz Mode Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('home.quizMode')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {QUIZ_MODES.map((mode) => {
              const isMistakes = mode === 'mistakes';
              return (
                <button
                  key={mode}
                  onClick={() => handleQuizModeSelect(mode)}
                  className={`py-3 px-2 rounded-lg font-semibold transition-all duration-200 ${
                    quizMode === mode
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isMistakes ? t('home.quizMode.mistakes', { count: mistakeCount }) : t(`home.quizMode.${mode}`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Type Selection Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('home.selectType')}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeCardClick(type)}
                className={`transition-all duration-200 hover:scale-105 ${
                  selectedType === type ? 'ring-2 ring-indigo-500 rounded-2xl' : ''
                }`}
              >
                <TypeBadge type={type} size="md" showLabel={true} />
              </button>
            ))}
          </div>
        </div>

        {/* Preview Selected Type Badge */}
        {/* <div className="flex justify-center mb-6">
          <TypeBadge type={selectedType} size="lg" />
        </div> */}

        {/* Confirm Dialog */}
        {confirmDialogOpen && pendingType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                {t('dialog.confirm')}
              </h2>
              <div className="flex flex-col items-center mb-6">
                <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('dialog.selectedType')}
                </span>
                <TypeBadge type={pendingType} size="lg" />
                <span className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                  {getTypeName(pendingType)}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('dialog.cancel')}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  {t('dialog.confirm')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Questions Dialog */}
        {noQuestionsOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setNoQuestionsOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="no-questions-title"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm"
              onClick={(event) => event.stopPropagation()}
            >
              <h2
                id="no-questions-title"
                className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center"
              >
                {t('dialog.noQuestionsTitle')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                {t('dialog.noQuestionsMessage')}
              </p>
              <button
                onClick={() => setNoQuestionsOpen(false)}
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {t('dialog.ok')}
              </button>
            </div>
          </div>
        )}

        {/* Install Prompt */}
        <div className="flex justify-center mb-6">
          <InstallPrompt />
        </div>

        {/* Multiplier Preview */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
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
        </div> */}
      </div>
    </div>
  );
}
