import type { GameMode } from '../data/typeData';

export type QuizMode = 'both' | 'single' | 'dual';

export const QUIZ_MODES: QuizMode[] = ['both', 'single', 'dual'];

export function isQuizMode(value: string): value is QuizMode {
  return (QUIZ_MODES as string[]).includes(value);
}

export interface QuizSettings {
  gameMode: GameMode;
  quizMode: QuizMode;
}
