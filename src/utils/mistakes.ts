import { ALL_TYPES, GameMode, Type } from '../data/typeData';

export const MISTAKES_STORAGE_KEY = 'pokemon-quiz-mistakes';

export interface MistakeEntry {
  attackerType: Type;
  defenderTypes: Type[]; // length 1 or 2, stored in sorted (normalized) order
  gameMode: GameMode;
}

export function isType(value: unknown): value is Type {
  return typeof value === 'string' && (ALL_TYPES as readonly string[]).includes(value);
}

function isGameModeValue(value: unknown): value is GameMode {
  return value === 'gen6' || value === 'go';
}

/** Order-independent, game-rule-scoped identity for a missed matchup.
 *  Game mode is part of the key because correct multipliers differ between
 *  gen6 and go (e.g. electric vs ground: 0 vs 0.391). */
export function mistakeKey(attackerType: Type, defenderTypes: Type[], gameMode: GameMode): string {
  return `${gameMode}|${attackerType}|${[...defenderTypes].sort().join('|')}`;
}

export function isMistakeEntry(value: unknown): value is MistakeEntry {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (!isType(candidate.attackerType)) return false;
  if (!isGameModeValue(candidate.gameMode)) return false;
  const defenders = candidate.defenderTypes;
  if (!Array.isArray(defenders) || defenders.length < 1 || defenders.length > 2) return false;
  return defenders.every(isType);
}

/** Strictly validated read; returns [] on missing/corrupt data. Dedupes + normalizes. */
export function readSavedMistakes(): MistakeEntry[] {
  try {
    const stored = localStorage.getItem(MISTAKES_STORAGE_KEY);
    if (stored === null) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    const entries: MistakeEntry[] = [];
    for (const item of parsed) {
      if (!isMistakeEntry(item)) continue;
      const normalized: MistakeEntry = {
        attackerType: item.attackerType,
        defenderTypes: [...item.defenderTypes].sort(),
        gameMode: item.gameMode,
      };
      const key = mistakeKey(normalized.attackerType, normalized.defenderTypes, normalized.gameMode);
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push(normalized);
    }
    return entries;
  } catch {
    return [];
  }
}

export function persistMistakes(entries: readonly MistakeEntry[]): void {
  try {
    localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage unavailable (private mode, restricted iframe)
  }
}

/** New list with `entry` added; returns the same list if already present (no dups). */
export function addMistake(entries: MistakeEntry[], entry: MistakeEntry): MistakeEntry[] {
  const key = mistakeKey(entry.attackerType, entry.defenderTypes, entry.gameMode);
  const exists = entries.some(
    (existing) =>
      mistakeKey(existing.attackerType, existing.defenderTypes, existing.gameMode) === key,
  );
  if (exists) return entries;
  const normalized: MistakeEntry = { ...entry, defenderTypes: [...entry.defenderTypes].sort() };
  return [...entries, normalized];
}

/** New list with the matching entry removed (dual-type order independent).
 *  Returns the same list when nothing matched, keeping state referentially stable. */
export function removeMistake(entries: MistakeEntry[], entry: MistakeEntry): MistakeEntry[] {
  const key = mistakeKey(entry.attackerType, entry.defenderTypes, entry.gameMode);
  const filtered = entries.filter(
    (existing) =>
      mistakeKey(existing.attackerType, existing.defenderTypes, existing.gameMode) !== key,
  );
  return filtered.length === entries.length ? entries : filtered;
}
