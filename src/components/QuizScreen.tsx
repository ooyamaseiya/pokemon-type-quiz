import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy } from 'lucide-react';
import {
  calculateEffectiveness,
  GameMode,
  getMultipliers,
  Type,
} from '../data/typeData';
import { QuizMode } from '../types/quiz';
import { generateMistakeQuestion, generateOpponentTypes } from '../utils/quizGenerator';
import { MistakeEntry, addMistake, removeMistake } from '../utils/mistakes';
import MultiplierCard from './MultiplierCard';
import TypeBadge from './TypeBadge';

interface QuizScreenProps {
  attackerType: Type;
  gameMode: GameMode;
  quizMode: QuizMode;
  onExit: () => void;
  language: 'en' | 'jp';
  mistakes: MistakeEntry[];
  onMistakesChange: (entries: MistakeEntry[]) => void;
  onAttackerTypeChange: (type: Type) => void;
}

interface QuestionState {
  opponentTypes: Type[];
  attackerType: Type;
  questionKey: string;
  selectedMultiplier: number | null;
  isCorrect: boolean | null;
  questionNumber: number;
  score: number;
}

const MODE_BADGE_KEYS: Record<QuizMode, string> = {
  both: 'quiz.modeBadge.both',
  single: 'quiz.modeBadge.single',
  dual: 'quiz.modeBadge.dual',
  mistakes: 'quiz.modeBadge.mistakes',
};

export default function QuizScreen({ attackerType, gameMode, quizMode, onExit, language, mistakes, onMistakesChange, onAttackerTypeChange }: QuizScreenProps) {
  const { t, i18n } = useTranslation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTypeName = (type: Type) => {
    return i18n.t(`type.${type}`);
  };

  const multipliers = getMultipliers(gameMode);

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

  const seenKeysRef = useRef<Set<string>>(new Set());

  // Source of truth for the saved-mistakes pool during the session (scoped to
  // this game mode); the `mistakes` prop is only the initial snapshot.
  const mistakePoolRef = useRef<MistakeEntry[]>(
    mistakes.filter((m) => m.gameMode === gameMode),
  );

  const [completed, setCompleted] = useState(
    quizMode === 'mistakes' && mistakePoolRef.current.length === 0,
  );

  const [question, setQuestion] = useState<QuestionState>(() => {
    const generated =
      quizMode === 'mistakes'
        ? (generateMistakeQuestion(mistakePoolRef.current, seenKeysRef.current, null) ??
            { types: [attackerType], key: '__empty__', resetOccurred: false, attackerType })
        : generateOpponentTypes(quizMode, seenKeysRef.current, null, attackerType);
    seenKeysRef.current.add(generated.key);
    return {
      opponentTypes: generated.types,
      attackerType: generated.attackerType,
      questionKey: generated.key,
      selectedMultiplier: null,
      isCorrect: null,
      questionNumber: 1,
      score: 0,
    };
  });

  const handleNext = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const generated =
      quizMode === 'mistakes'
        ? generateMistakeQuestion(mistakePoolRef.current, seenKeysRef.current, question.questionKey)
        : generateOpponentTypes(quizMode, seenKeysRef.current, question.questionKey, attackerType);
    if (generated === null) {
      setCompleted(true);
      return;
    }
    if (generated.resetOccurred) {
      seenKeysRef.current.clear();
    }
    seenKeysRef.current.add(generated.key);
    setQuestion(prev => ({
      ...prev,
      opponentTypes: generated.types,
      attackerType: generated.attackerType,
      questionKey: generated.key,
      selectedMultiplier: null,
      isCorrect: null,
      questionNumber: prev.questionNumber + 1,
    }));
  }, [quizMode, question.questionKey, attackerType]);

  const handleSelectMultiplier = useCallback((multiplier: number) => {
    const result = calculateEffectiveness(question.attackerType, question.opponentTypes, gameMode);
    const isCorrect = multiplier === result.multiplier;

    const entry: MistakeEntry = { attackerType: question.attackerType, defenderTypes: question.opponentTypes, gameMode };
    mistakePoolRef.current = isCorrect
      ? removeMistake(mistakePoolRef.current, entry)
      : addMistake(mistakePoolRef.current, entry);
    onMistakesChange(mistakePoolRef.current);

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
  }, [question.attackerType, question.opponentTypes, gameMode, handleNext, onMistakesChange]);

  useEffect(() => {
    onAttackerTypeChange(question.attackerType);
  }, [question.attackerType, onAttackerTypeChange]);

  const result = calculateEffectiveness(question.attackerType, question.opponentTypes, gameMode);
  const explanation = question.isCorrect !== null ? generateExplanation(question.attackerType, question.opponentTypes, result) : '';

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
        {completed ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <Trophy size={48} className="text-amber-500 mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {t('quiz.completed')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('quiz.allClear')}</p>
            <button
              onClick={onExit}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
            >
              {t('quiz.backToHome')}
            </button>
          </div>
        ) : (
          <>
        {/* Score and Question */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('quiz.score')}:</span>
            <span className="ml-2 font-bold text-indigo-600 dark:text-indigo-400">{question.score}</span>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            {t(MODE_BADGE_KEYS[quizMode])}
          </span>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('quiz.question')}:</span>
            <span className="ml-2 font-bold text-gray-800 dark:text-white">{question.questionNumber}</span>
          </div>
        </div>

        {/* Matchup: Attacker vs Opponent(s) */}
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
          {/* Attacker column */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('home.attackerType')}</span>
            <TypeBadge type={question.attackerType} size="lg" />
          </div>

          {/* Directional separator */}
          <span className="text-2xl font-bold text-gray-400 dark:text-gray-500" aria-hidden="true">
            →
          </span>

          {/* Opponent column */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('quiz.opponent')}</span>
            <div className="flex flex-col items-center gap-2">
              {question.opponentTypes.map((type, idx) => (
                <TypeBadge key={idx} type={type} size="lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Multiplier Selection */}
        <div className="mb-6">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{t('quiz.choose')}</p>
          <div className="grid grid-cols-3 gap-3">
            {multipliers.map((multiplier) => (
              <MultiplierCard
                key={multiplier}
                multiplier={multiplier}
                isSelected={question.selectedMultiplier === multiplier}
                isCorrect={question.isCorrect === true && question.selectedMultiplier === multiplier}
                isRevealed={question.isCorrect !== null && multiplier === result.multiplier}
                onClick={() => question.isCorrect === null && handleSelectMultiplier(multiplier)}
                disabled={question.isCorrect !== null}
              />
            ))}
          </div>
        </div>

        {/* Feedback */}
        {question.isCorrect !== null && (
          <div className={`rounded-xl p-6 mb-6 animate-fade-in ${question.isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className="text-center">
              {/* <h2 className={`text-2xl font-bold mb-2 ${question.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {question.isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
              </h2> */}
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
          </>
        )}
      </div>
    </div>
  );
}
