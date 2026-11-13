// Gen6+ Type Effectiveness Data
// Based on official Pokémon type chart (Gen 6+)

export type Type = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export type GameMode = 'gen6' | 'go';

export const TYPE_COLORS: Record<Type, string> = {
  normal: '#A8A878',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FFC',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735792',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// Attack type effectiveness against each defense type
// 0 = no effect, 0.5 = half, 1 = normal, 2 = super effective, 4 = double super effective
const TYPE_CHART: Record<Type, Record<Type, number>> = {
  normal: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 0, dragon: 1, dark: 1, steel: 1, fairy: 1,
  },
  fire: {
    normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2,
    rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1,
  },
  water: {
    normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1,
    fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1,
    rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1,
  },
  electric: {
    normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1,
    fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1,
  },
  grass: {
    normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1,
    fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5,
    rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1,
  },
  ice: {
    normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5,
    fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1,
  },
  fighting: {
    normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 2,
    fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5,
    rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5,
  },
  poison: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1,
    fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2,
  },
  ground: {
    normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1,
    fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5,
    rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1,
  },
  flying: {
    normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1,
    fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2,
    rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1,
  },
  psychic: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1,
    rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1,
  },
  bug: {
    normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1,
    fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1,
    rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5,
  },
  rock: {
    normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2,
    fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2,
    rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1,
  },
  ghost: {
    normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1,
    rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1,
  },
  dragon: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0, fairy: 0,
  },
  dark: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1,
    rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5,
  },
  steel: {
    normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 1, ice: 2,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2,
  },
  fairy: {
    normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 2, poison: 0, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1,
  },
};

// Pokémon GO type chart (different multipliers)
const GO_TYPE_CHART: Record<Type, Record<Type, number>> = {
  normal: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 0.391, dragon: 1, dark: 1, steel: 1, fairy: 1,
  },
  fire: {
    normal: 1, fire: 0.625, water: 0.625, electric: 1, grass: 1.6, ice: 1.6,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1.6,
    rock: 0.625, ghost: 1, dragon: 0.625, dark: 1, steel: 1.6, fairy: 1,
  },
  water: {
    normal: 1, fire: 1.6, water: 0.625, electric: 1, grass: 0.625, ice: 1,
    fighting: 1, poison: 1, ground: 1.6, flying: 1, psychic: 1, bug: 1,
    rock: 1.6, ghost: 1, dragon: 0.625, dark: 1, steel: 1, fairy: 1,
  },
  electric: {
    normal: 1, fire: 1, water: 1.6, electric: 0.625, grass: 0.625, ice: 1,
    fighting: 1, poison: 1, ground: 0.391, flying: 1.6, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 0.625, dark: 1, steel: 1, fairy: 1,
  },
  grass: {
    normal: 1, fire: 0.625, water: 1.6, electric: 1, grass: 0.625, ice: 1,
    fighting: 1, poison: 0.625, ground: 1.6, flying: 0.625, psychic: 1, bug: 0.625,
    rock: 1.6, ghost: 1, dragon: 0.625, dark: 1, steel: 0.625, fairy: 1,
  },
  ice: {
    normal: 1, fire: 0.625, water: 0.625, electric: 1, grass: 1.6, ice: 0.625,
    fighting: 1, poison: 1, ground: 1.6, flying: 1.6, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 1.6, dark: 1, steel: 0.625, fairy: 1,
  },
  fighting: {
    normal: 1.6, fire: 1, water: 1, electric: 1, grass: 1, ice: 1.6,
    fighting: 1, poison: 0.625, ground: 1, flying: 0.625, psychic: 0.625, bug: 0.625,
    rock: 1.6, ghost: 0.391, dragon: 1, dark: 1.6, steel: 1.6, fairy: 0.625,
  },
  poison: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1.6, ice: 1,
    fighting: 1, poison: 0.625, ground: 0.625, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 0.625, dragon: 1, dark: 1, steel: 0.391, fairy: 1.6,
  },
  ground: {
    normal: 1, fire: 1.6, water: 1, electric: 1.6, grass: 0.625, ice: 1,
    fighting: 1, poison: 1.6, ground: 1, flying: 0.391, psychic: 1, bug: 0.625,
    rock: 1.6, ghost: 1, dragon: 1, dark: 1, steel: 1.6, fairy: 1,
  },
  flying: {
    normal: 1, fire: 1, water: 1, electric: 0.625, grass: 1.6, ice: 1,
    fighting: 1.6, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1.6,
    rock: 0.625, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1,
  },
  psychic: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1.6, poison: 1.6, ground: 1, flying: 1, psychic: 0.625, bug: 1,
    rock: 1, ghost: 1, dragon: 1, dark: 0.391, steel: 0.625, fairy: 1,
  },
  bug: {
    normal: 1, fire: 0.625, water: 1, electric: 1, grass: 1.6, ice: 1,
    fighting: 0.625, poison: 0.625, ground: 1, flying: 0.625, psychic: 1.6, bug: 1,
    rock: 1, ghost: 0.625, dragon: 1, dark: 1.6, steel: 0.625, fairy: 0.625,
  },
  rock: {
    normal: 1, fire: 1.6, water: 1, electric: 1, grass: 1, ice: 1.6,
    fighting: 0.625, poison: 1, ground: 0.625, flying: 1.6, psychic: 1, bug: 1.6,
    rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.625, fairy: 1,
  },
  ghost: {
    normal: 0.391, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1.6, bug: 1,
    rock: 1, ghost: 1.6, dragon: 1, dark: 0.625, steel: 1, fairy: 1,
  },
  dragon: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 1.6, dark: 1, steel: 0.391, fairy: 0.391,
  },
  dark: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 0.625, poison: 1, ground: 1, flying: 1, psychic: 1.6, bug: 1,
    rock: 1, ghost: 1.6, dragon: 1, dark: 0.625, steel: 1, fairy: 0.625,
  },
  steel: {
    normal: 1, fire: 0.625, water: 0.625, electric: 1, grass: 1, ice: 1.6,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1.6, ghost: 1, dragon: 1, dark: 1, steel: 0.625, fairy: 1.6,
  },
  fairy: {
    normal: 1, fire: 0.625, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1.6, poison: 0.391, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 1.6, dark: 1, steel: 0.625, fairy: 1,
  },
};

// All 18 types in order
export const ALL_TYPES: Type[] = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

// Japanese type names
export const TYPE_NAMES_JP: Record<Type, string> = {
  normal: 'ノーマル',
  fire: 'ほのお',
  water: 'みず',
  electric: 'でんき',
  grass: 'くさ',
  ice: 'こおり',
  fighting: 'かくとう',
  poison: 'どく',
  ground: 'じめん',
  flying: 'ひこう',
  psychic: 'エスパー',
  bug: 'むし',
  rock: 'いわ',
  ghost: 'ゴース',
  dragon: 'ドラゴン',
  dark: 'あく',
  steel: 'はがね',
  fairy: 'フェアリー',
};

export const TYPE_NAMES_EN: Record<Type, string> = {
  normal: 'Normal',
  fire: 'Fire',
  water: 'Water',
  electric: 'Electric',
  grass: 'Grass',
  ice: 'Ice',
  fighting: 'Fighting',
  poison: 'Poison',
  ground: 'Ground',
  flying: 'Flying',
  psychic: 'Psychic',
  bug: 'Bug',
  rock: 'Rock',
  ghost: 'Ghost',
  dragon: 'Dragon',
  dark: 'Dark',
  steel: 'Steel',
  fairy: 'Fairy',
};

// Calculate type effectiveness
export interface CalculationResult {
  multiplier: number;
  breakdown: Array<{ type: Type; factor: number }>;
  isSingleType: boolean;
}

export function calculateEffectiveness(attackerType: Type, defenderTypes: Type[], gameMode: GameMode = 'gen6'): CalculationResult {
  const chart = gameMode === 'go' ? GO_TYPE_CHART : TYPE_CHART;
  const breakdown = defenderTypes.map(type => ({
    type,
    factor: chart[attackerType][type],
  }));

  const multiplier = breakdown.reduce((acc, { factor }) => acc * factor, 1);
  const isSingleType = defenderTypes.length === 1;

  return { multiplier, breakdown, isSingleType };
}

// Get all possible multipliers for a game mode
export const POSSIBLE_MULTIPLIERS: Record<GameMode, number[]> = {
  gen6: [0, 0.25, 0.5, 1, 2, 4],
  go: [0.244, 0.391, 0.625, 1, 1.6, 2.56],
};

// Get type chart for a game mode
export function getTypeChartData(gameMode: GameMode): Record<Type, Record<Type, number>> {
  return gameMode === 'go' ? GO_TYPE_CHART : TYPE_CHART;
}

// Get multipliers for a game mode
export function getMultipliers(gameMode: GameMode): number[] {
  return POSSIBLE_MULTIPLIERS[gameMode];
}
