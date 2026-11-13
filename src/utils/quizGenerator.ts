import { ALL_TYPES, Type } from '../data/typeData';
import { QuizMode } from '../types/quiz';

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function pickDifferentType(excluded: Type): Type | null {
  const candidates = ALL_TYPES.filter((type) => type !== excluded);
  if (candidates.length === 0) {
    return null;
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function generateOpponentTypes(quizMode: QuizMode): Type[] {
  const firstType = randomFrom(ALL_TYPES);

  if (quizMode === 'single') {
    return [firstType];
  }

  const secondType = pickDifferentType(firstType);
  if (secondType === null) {
    return [firstType];
  }

  if (quizMode === 'dual') {
    return [firstType, secondType];
  }

  if (Math.random() < 0.4) {
    return [firstType, secondType];
  }

  return [firstType];
}
