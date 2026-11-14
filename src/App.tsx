import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import { Type, GameMode } from './data/typeData';
import { QuizMode, isQuizMode } from './types/quiz';
import {
  AppLanguage,
  ThemeMode,
  applyThemeClass,
  persistLanguage,
  persistTheme,
  readStoredLanguage,
  readStoredTheme,
} from './utils/settings';
import { MistakeEntry, persistMistakes, readSavedMistakes } from './utils/mistakes';

export type { AppLanguage, ThemeMode } from './utils/settings';
export type Screen = 'home' | 'quiz';

function readStoredGameMode(): GameMode {
  try {
    const stored = localStorage.getItem('pokemon-quiz-game-mode');
    if (stored === 'gen6' || stored === 'go') return stored;
  } catch {
    // localStorage unavailable
  }
  return 'gen6';
}

function readStoredQuizMode(): QuizMode {
  try {
    const stored = localStorage.getItem('pokemon-quiz-quiz-mode');
    if (stored && isQuizMode(stored)) return stored;
  } catch {
    // localStorage unavailable
  }
  return 'both';
}

function App() {
  const { i18n } = useTranslation();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedType, setSelectedType] = useState<Type>('normal');
  const [quizAttackerType, setQuizAttackerType] = useState<Type>(selectedType);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => readStoredTheme());
  const [language, setLanguage] = useState<AppLanguage>(() => readStoredLanguage());
  const [gameMode, setGameMode] = useState<GameMode>(() => readStoredGameMode());
  const [mistakes, setMistakes] = useState<MistakeEntry[]>(() => readSavedMistakes());
  const [quizMode, setQuizMode] = useState<QuizMode>(() => {
    const stored = readStoredQuizMode();
    if (stored === 'mistakes' && readSavedMistakes().filter((m) => m.gameMode === gameMode).length === 0) {
      return 'both';
    }
    return stored;
  });
  const [quizSession, setQuizSession] = useState(0);

  // Apply theme to the DOM and follow OS preference changes while in system mode
  useEffect(() => {
    applyThemeClass(themeMode);
    if (themeMode !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handlePreferenceChange = () => {
      applyThemeClass('system');
    };
    media.addEventListener('change', handlePreferenceChange);
    return () => {
      media.removeEventListener('change', handlePreferenceChange);
    };
  }, [themeMode]);

  // Persist settings to localStorage
  useEffect(() => {
    persistTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    persistLanguage(language);
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    try {
      localStorage.setItem('pokemon-quiz-game-mode', gameMode);
    } catch {
      // localStorage unavailable
    }
  }, [gameMode]);

  useEffect(() => {
    try {
      localStorage.setItem('pokemon-quiz-quiz-mode', quizMode);
    } catch {
      // localStorage unavailable
    }
  }, [quizMode]);

  useEffect(() => {
    persistMistakes(mistakes);
  }, [mistakes]);

  const handleMistakesChange = useCallback((entries: MistakeEntry[]) => {
    setMistakes((prev) => [
      ...prev.filter((m) => m.gameMode !== gameMode),
      ...entries,
    ]);
  }, [gameMode]);

  const startQuiz = () => {
    setQuizSession((session) => session + 1);
    setScreen('quiz');
  };

  const exitQuiz = () => {
    if (quizMode === 'mistakes' && mistakes.filter((m) => m.gameMode === gameMode).length === 0) {
      setQuizMode('both');
    }
    setScreen('home');
  };

  const mistakeCount = mistakes.filter((m) => m.gameMode === gameMode).length;

  return (
    <div className="min-h-screen">
      <Header
        isQuizMode={screen === 'quiz'}
        onExit={exitQuiz}
        attackerType={screen === 'quiz' ? quizAttackerType : undefined}
        themeMode={themeMode}
        onThemeChange={setThemeMode}
        language={language}
        onLanguageChange={setLanguage}
      />

      {screen === 'home' && (
        <HomeScreen
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onStartQuiz={startQuiz}
          gameMode={gameMode}
          onGameModeChange={setGameMode}
          quizMode={quizMode}
          onQuizModeChange={setQuizMode}
          mistakeCount={mistakeCount}
        />
      )}

      {screen === 'quiz' && (
        <QuizScreen
          key={`${quizSession}-${gameMode}-${quizMode}`}
          attackerType={selectedType}
          gameMode={gameMode}
          quizMode={quizMode}
          onExit={exitQuiz}
          language={language}
          mistakes={mistakes}
          onMistakesChange={handleMistakesChange}
          onAttackerTypeChange={setQuizAttackerType}
        />
      )}
    </div>
  );
}

export default App;
