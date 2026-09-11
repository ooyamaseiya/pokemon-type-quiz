import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import { Type } from './data/typeData';

export type ThemeMode = 'system' | 'dark' | 'light';
export type Screen = 'home' | 'quiz';

function App() {
  const { i18n } = useTranslation();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedType, setSelectedType] = useState<Type>('normal');
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [language, setLanguage] = useState<'en' | 'jp'>('en');

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('pokemon-quiz-theme') as ThemeMode | null;
    const savedLang = localStorage.getItem('pokemon-quiz-language') as 'en' | 'jp' | null;
    
    if (savedTheme) setThemeMode(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('pokemon-quiz-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('pokemon-quiz-language', language);
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const startQuiz = () => {
    setScreen('quiz');
  };

  const exitQuiz = () => {
    setScreen('home');
  };

  return (
    <div className="min-h-screen">
      <Header
        isQuizMode={screen === 'quiz'}
        onExit={exitQuiz}
        attackerType={screen === 'quiz' ? selectedType : undefined}
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
        />
      )}
      
      {screen === 'quiz' && (
        <QuizScreen
          attackerType={selectedType}
          onExit={exitQuiz}
          language={language}
        />
      )}
    </div>
  );
}

export default App;
