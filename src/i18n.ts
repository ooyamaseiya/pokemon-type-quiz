import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      'app.title': 'Pokémon Type Quiz',
      'app.description': 'Test your type matchup knowledge!',
      'home.selectType': 'Select Attack Move Type',
      'home.startQuiz': 'Start Quiz',
      'home.attackerType': 'Attacker Type',
      'quiz.opponent': 'Opponent Type',
      'quiz.correct': 'Correct!',
      'quiz.incorrect': 'Incorrect!',
      'quiz.explanation': 'Explanation',
      'quiz.next': 'Next',
      'quiz.multiplier': 'Multiplier',
      'quiz.choose': 'Choose the damage multiplier',
      'quiz.exit': 'Exit',
      'quiz.score': 'Score',
      'quiz.question': 'Question',
      'theme.system': 'System',
      'theme.dark': 'Dark',
      'theme.light': 'Light',
    },
  },
  jp: {
    translation: {
      'app.title': 'ポケモンタイプクイズ',
      'app.description': 'タイプ相性をテストしよう！',
      'home.selectType': '攻撃タイプを選択',
      'home.startQuiz': 'クイズ開始',
      'home.attackerType': '攻撃タイプ',
      'quiz.opponent': '相手タイプ',
      'quiz.correct': '正解！',
      'quiz.incorrect': '不正解',
      'quiz.explanation': '解説',
      'quiz.next': '次へ',
      'quiz.multiplier': '倍率',
      'quiz.choose': 'ダメージ倍率を選ぼう',
      'quiz.exit': '退出',
      'quiz.score': 'スコア',
      'quiz.question': '問題',
      'theme.system': 'システム',
      'theme.dark': 'ダーク',
      'theme.light': 'ライト',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
