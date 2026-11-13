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

// Order-independent unique key for a question (defender type combination).
// Display order of dual types does not matter, so types are sorted before joining.
export function questionKey(opponentTypes: Type[]): string {
  return [...opponentTypes].sort().join('|');
}

const SINGLE_POOL: Type[][] = ALL_TYPES.map((type) => [type]);

const DUAL_POOL: Type[][] = ALL_TYPES.flatMap((first, index) =>
  ALL_TYPES.slice(index + 1).map((second) => [first, second]),
);

const POOLS: Record<QuizMode, Type[][]> = {
  single: SINGLE_POOL,
  dual: DUAL_POOL,
  both: [...SINGLE_POOL, ...DUAL_POOL],
};

type QuestionSubset = 'single' | 'dual';

const SUBSET_POOLS: Record<QuestionSubset, Type[][]> = {
  single: SINGLE_POOL,
  dual: DUAL_POOL,
};

// Existing rule: 'both' mode mixes 60% single-type and 40% dual-type questions.
function chooseSubset(quizMode: QuizMode): QuestionSubset {
  if (quizMode === 'single') {
    return 'single';
  }
  if (quizMode === 'dual') {
    return 'dual';
  }
  return Math.random() < 0.4 ? 'dual' : 'single';
}

// Preserve the previous random display order for dual-type questions.
function shuffleDisplayOrder(types: Type[]): Type[] {
  if (types.length === 2 && Math.random() < 0.5) {
    return [types[1], types[0]];
  }
  return types;
}

export interface GeneratedQuestion {
  types: Type[];
  key: string;
  resetOccurred: boolean;
}

export function generateOpponentTypes(
  quizMode: QuizMode,
  seenKeys: ReadonlySet<string>,
  previousKey: string | null,
): GeneratedQuestion {
  const primary = chooseSubset(quizMode);
  const subsets: QuestionSubset[] =
    quizMode === 'both'
      ? primary === 'single'
        ? ['single', 'dual']
        : ['dual', 'single']
      : [quizMode];

  // In 'both' mode, fall back to the other subset when the chosen one is
  // exhausted, so the full pool is used before any reset happens.
  for (const subset of subsets) {
    const candidates = SUBSET_POOLS[subset].filter(
      (types) => !seenKeys.has(questionKey(types)),
    );
    if (candidates.length > 0) {
      const types = randomFrom(candidates);
      return {
        types: shuffleDisplayOrder(types),
        key: questionKey(types),
        resetOccurred: false,
      };
    }
  }

  // The entire pool for the current mode has been exhausted: reset the session
  // history and ensure the first question after the reset differs from the
  // immediately preceding one.
  const candidates = POOLS[quizMode].filter(
    (types) => questionKey(types) !== previousKey,
  );
  const types = randomFrom(candidates);
  return {
    types: shuffleDisplayOrder(types),
    key: questionKey(types),
    resetOccurred: true,
  };
}
