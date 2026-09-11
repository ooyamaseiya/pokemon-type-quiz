import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getRandomOpponentTypes, calculateEffectiveness, Type, POSSIBLE_MULTIPLIERS } from '../data/typeData';

interface QuizScreenProps {
  attackerType: Type;
  onExit: () => void;
  language: 'en' | 'jp';
}

interface QuestionState {
  opponentTypes: Type[];
  selectedMultiplier: number | null;
  isCorrect: boolean | null;
  questionNumber: number;
  score: number;
}

export default function QuizScreen({ attackerType, language }: QuizScreenProps) {
  const { t, i18n } = useTranslation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const getTypeName = (type: Type) => {
    return i18n.t(`type.${type}`);
  };

  const generateExplanation = useCallback((attackerType: Type, defenderTypes: Type[], result: ReturnType<typeof calculateEffectiveness>) => {
    const { multiplier, breakdown, isSingleType } = result;
    const attackerName = getTypeName(attackerType);
    
    if (isSingleType) {
      const defenderName = getTypeName(defenderTypes[0]);
      return t('explanation.single', { attacker: attackerName, factor: multiplier, defender: defenderName });
    } else {
      // Dual-type explanation
      const factors = breakdown.map(({ type, factor }) => {
        const typeName = getTypeName(type);
        return `${typeName} ${factor}x`;
      }).join(language === 'jp' ? '、' : ' and ');
      return t('explanation.dual', { attacker: attackerName, factors, total: multiplier });
    }
  }, [getTypeName, t, language]);

  const [question, setQuestion] = useState<QuestionState>({
    opponentTypes: getRandomOpponentTypes(),
    selectedMultiplier: null,
    isCorrect: null,
    questionNumber: 1,
    score: 0,
  });

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier === 0) return 'bg-gray-400 text-white';
    if (multiplier < 1) return 'bg-orange-400 text-white';
    if (multiplier === 1) return 'bg-green-500 text-white';
    return 'bg-red-500 text-white';
  };

  const handleNext = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setQuestion(prev => ({
      ...prev,
      opponentTypes: getRandomOpponentTypes(),
      selectedMultiplier: null,
      isCorrect: null,
      questionNumber: prev.questionNumber + 1,
    }));
  }, []);

  const handleSelectMultiplier = useCallback((multiplier: number) => {
    const result = calculateEffectiveness(attackerType, question.opponentTypes);
    const isCorrect = multiplier === result.multiplier;
    
    setQuestion(prev => ({
      ...prev,
      selectedMultiplier: multiplier,
      isCorrect: isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
    
    // Auto-advance on correct answer after 1000ms
    if (isCorrect) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 1000);
    }
  }, [attackerType, question.opponentTypes, handleNext]);

  const result = calculateEffectiveness(attackerType, question.opponentTypes);
  const explanation = question.isCorrect !== null ? generateExplanation(attackerType, question.opponentTypes, result) : '';

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Score and Question */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('quiz.score')}:</span>
            <span className="ml-2 font-bold text-indigo-600 dark:text-indigo-400">{question.score}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('quiz.question')}:</span>
            <span className="ml-2 font-bold text-gray-800 dark:text-white">{question.questionNumber}</span>
          </div>
        </div>

        {/* Attacker Type Display */}
        <div className="flex justify-center mb-6">
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">{t('home.attackerType')}</span>
            <div
              className="type-badge text-xl px-6 py-3"
              style={{ backgroundColor: `var(--type-${attackerType})` }}
            >
              {getTypeName(attackerType)}
            </div>
          </div>
        </div>

        {/* Opponent Type Display */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">{t('quiz.opponent')}</span>
          <div className="flex justify-center gap-2">
            {question.opponentTypes.map((type, idx) => (
              <div
                key={idx}
                className="type-badge text-xl"
                style={{ backgroundColor: `var(--type-${type})` }}
              >
                {getTypeName(type)}
              </div>
            ))}
          </div>
        </div>

        {/* Multiplier Selection */}
        <div className="mb-6">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{t('quiz.choose')}</p>
          <div className="grid grid-cols-3 gap-3">
            {POSSIBLE_MULTIPLIERS.map((multiplier) => (
              <button
                key={multiplier}
                onClick={() => question.isCorrect === null && handleSelectMultiplier(multiplier)}
                disabled={question.isCorrect !== null}
                className={`
                  py-4 rounded-xl font-bold text-2xl transition-all duration-200
                  ${question.selectedMultiplier === multiplier
                    ? question.isCorrect === true
                      ? 'bg-green-500 text-white scale-105'
                      : 'bg-red-500 text-white scale-105'
                    : question.isCorrect !== null && multiplier === result.multiplier
                      ? 'bg-green-500 text-white'
                      : getMultiplierColor(multiplier) + ' hover:scale-105'
                  }
                  ${question.isCorrect === null ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                {multiplier}x
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {question.isCorrect !== null && (
          <div className={`rounded-xl p-6 mb-6 animate-fade-in ${question.isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-2 ${question.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {question.isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {explanation}
              </p>
            </div>
            {!question.isCorrect && (
              <button
                onClick={handleNext}
                className="w-full mt-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
              >
                {t('quiz.next')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
