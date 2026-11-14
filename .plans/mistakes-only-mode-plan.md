# Implementation Plan: Missed Questions Persistence & "Mistakes Only" Quiz Mode

Status: Ready for Build Mode. No prior context required — all file paths, types, and function signatures below are final.

## 1. Codebase Findings & Existing Architecture

Stack: React 19 + TypeScript (strict, `noUnusedLocals`/`noUnusedParameters`), Vite 8, Tailwind 4, i18next/react-i18next. Build = `tsc && vite build` (no separate lint script in `package.json`).

- `src/types/quiz.ts` — `QuizMode = 'both' | 'single' | 'dual'`, `QUIZ_MODES: QuizMode[]`, `isQuizMode(value: string)` guard, `QuizSettings`.
- `src/data/typeData.ts` — `Type` (18-union), `GameMode = 'gen6' | 'go'`, `ALL_TYPES`, `calculateEffectiveness(attacker, defenders, gameMode)` (charts differ per game mode, e.g. electric→ground is 0 in gen6 but 0.391 in go), `getMultipliers(gameMode)`.
- `src/utils/quizGenerator.ts` — `questionKey(opponentTypes)` = sorted types joined with `|` (order-independent, defender-only); `SINGLE_POOL`/`DUAL_POOL`/`POOLS: Record<QuizMode, Type[][]>`; `generateOpponentTypes(quizMode, seenKeys: ReadonlySet<string>, previousKey): GeneratedQuestion { types, key, resetOccurred }` (session dedup via `seenKeys`, pool-exhaustion reset with `resetOccurred: true`). `shuffleDisplayOrder` shuffles dual-type display 50/50.
- `src/utils/settings.ts` — storage convention: keys named `pokemon-quiz-*` (e.g. `pokemon-quiz-theme`, `pokemon-quiz-quiz-mode`), every read wrapped in `try/catch` with type-guard validation and safe default, every write `try/catch` no-op on failure.
- `src/App.tsx` — screen state `'home' | 'quiz'`; owns `selectedType` (attacker), `themeMode`, `language`, `gameMode`, `quizMode`, `quizSession` counter. `startQuiz()` bumps session + switches screen; `exitQuiz()` returns home. `QuizScreen` is keyed `` `${quizSession}-${gameMode}-${quizMode}` `` (full remount per session). Reads stored quiz mode via `readStoredQuizMode()` (guards with `isQuizMode`).
- `src/components/HomeScreen.tsx` — renders quiz-mode buttons by mapping `QUIZ_MODES` in a `grid grid-cols-3`, label `t(`home.quizMode.${mode}`)`. Type grid click → confirm dialog → `onTypeChange(type)` + `onStartQuiz()`.
- `src/components/QuizScreen.tsx` — `QuestionState { opponentTypes, questionKey, selectedMultiplier, isCorrect, questionNumber, score }`; `seenKeysRef = useRef<Set<string>>`; initial question generated in `useState` initializer; `handleSelectMultiplier(multiplier)` computes `calculateEffectiveness`, sets `isCorrect`, +1 score on correct, auto-advances via 1000 ms `setTimeout` on correct; `handleNext()` regenerates, clears `seenKeys` when `resetOccurred`; on incorrect the feedback panel shows a "Next" button. `MODE_BADGE_KEYS: Record<QuizMode, string>` maps to `quiz.modeBadge.*`. Prop `onExit` is currently unused (aliased `_onExit` to satisfy `noUnusedParameters`). No result/completion screen exists — quiz is endless.
- `src/i18n.ts` — flat dot-notation keys, `en` + `jp` resources (language codes are `'en'`/`'jp'`, not `'ja'`), interpolation `escapeValue: false`.
- No existing localStorage for questions/mistakes; no existing completion state.

## 2. Data Schema & Storage Design

### `src/utils/mistakes.ts` (NEW) — full module

```ts
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
export function addMistake(entries: readonly MistakeEntry[], entry: MistakeEntry): MistakeEntry[] {
  const key = mistakeKey(entry.attackerType, entry.defenderTypes, entry.gameMode);
  const exists = entries.some(
    (existing) =>
      mistakeKey(existing.attackerType, existing.defenderTypes, existing.gameMode) === key,
  );
  if (exists) return entries;
  const normalized: MistakeEntry = { ...entry, defenderTypes: [...entry.defenderTypes].sort() };
  return [...entries, normalized];
}

/** New list with the matching entry removed (dual-type order independent). */
export function removeMistake(entries: readonly MistakeEntry[], entry: MistakeEntry): MistakeEntry[] {
  const key = mistakeKey(entry.attackerType, entry.defenderTypes, entry.gameMode);
  return entries.filter(
    (existing) =>
      mistakeKey(existing.attackerType, existing.defenderTypes, existing.gameMode) !== key,
  );
}
```

Design notes:
- JSON array of `MistakeEntry` under key `pokemon-quiz-mistakes` (matches `pokemon-quiz-*` convention).
- Dual-type order never creates duplicates (sorted at store/compare time); display order is re-shuffled at render time by existing `shuffleDisplayOrder`.
- `gameMode` is part of identity: a correct answer in one game mode must NOT clear a mistake recorded in the other (different correct multipliers).
- All helpers are pure/immutable; React state stays referentially stable when nothing changed.

## 3. File-by-File Implementation Plan

### 3.1 `[NEW] src/utils/mistakes.ts`
As specified in Section 2 (copy verbatim).

### 3.2 `[MODIFY] src/types/quiz.ts`
- `export type QuizMode = 'both' | 'single' | 'dual' | 'mistakes';`
- `export const QUIZ_MODES: QuizMode[] = ['both', 'single', 'dual', 'mistakes'];`
- `isQuizMode` and `QuizSettings` unchanged (guard picks up `'mistakes'` automatically).

### 3.3 `[MODIFY] src/utils/quizGenerator.ts`
- Narrow the standard-mode records so they don't need a `mistakes` entry:
  - `type StandardQuizMode = Exclude<QuizMode, 'mistakes'>;` (export it)
  - `const POOLS: Record<StandardQuizMode, Type[][]>` (body unchanged)
  - `function chooseSubset(quizMode: StandardQuizMode): QuestionSubset` (body unchanged)
  - `export function generateOpponentTypes(quizMode: StandardQuizMode, ...)` (body unchanged)
- Add new export (reuses existing `questionKey`, `randomFrom`, `shuffleDisplayOrder` in the same file):

```ts
import { MistakeEntry } from './mistakes';

/** Draw the next question from the saved-mistakes pool.
 *  Returns null only when the pool is empty (session finished).
 *  When every remaining pool entry has already been asked this session,
 *  the seen set is flagged for reset (same semantics as standard modes). */
export function generateMistakeQuestion(
  pool: readonly MistakeEntry[],
  seenKeys: ReadonlySet<string>,
  previousKey: string | null,
): GeneratedQuestion | null {
  if (pool.length === 0) return null;
  const unseen = pool.filter((entry) => !seenKeys.has(questionKey(entry.defenderTypes)));
  const candidates =
    unseen.length > 0
      ? unseen
      : pool.filter((entry) => questionKey(entry.defenderTypes) !== previousKey);
  const fallback = candidates.length > 0 ? candidates : [...pool];
  const entry = randomFrom(fallback);
  return {
    types: shuffleDisplayOrder(entry.defenderTypes),
    key: questionKey(entry.defenderTypes),
    resetOccurred: unseen.length === 0,
  };
}
```
- Note: caller owns clearing `seenKeys` when `resetOccurred` (existing convention — the generator never mutates `seenKeys`).
- No circular import: `mistakes.ts` imports only from `../data/typeData`.

### 3.4 `[MODIFY] src/i18n.ts`
Add to `en.translation` (after `'home.quizMode.dual'` / `'quiz.modeBadge.dual'` where sensible):
```
'home.quizMode.mistakes': 'Mistakes Only ({{count}})',
'home.quizMode.mistakesEmpty': 'No mistakes saved yet',
'quiz.modeBadge.mistakes': 'Mistakes Only',
'quiz.completed': 'Quiz Complete!',
'quiz.allClear': 'You cleared every saved mistake. Nice work!',
'quiz.backToHome': 'Back to Home',
```
Add to `jp.translation`:
```
'home.quizMode.mistakes': 'まちがいのみ ({{count}}件)',
'home.quizMode.mistakesEmpty': '保存中のまちがいはありません',
'quiz.modeBadge.mistakes': 'まちがいのみ',
'quiz.completed': 'クイズ完了！',
'quiz.allClear': '保存されていたまちがいをすべて正解でクリアしました。おつかれさま！',
'quiz.backToHome': 'ホームに戻る',
```

### 3.5 `[MODIFY] src/App.tsx`
- Import: `import { MistakeEntry, persistMistakes, readSavedMistakes } from './utils/mistakes';`
- New state (declare BEFORE `quizMode` so the guard can reference storage):
  ```ts
  const [mistakes, setMistakes] = useState<MistakeEntry[]>(() => readSavedMistakes());
  ```
- Guard the stored quiz mode: change `readStoredQuizMode()` call site so a stored `'mistakes'` with an empty scoped pool falls back to `'both'`:
  ```ts
  const [quizMode, setQuizMode] = useState<QuizMode>(() => {
    const stored = readStoredQuizMode();
    if (stored === 'mistakes' && readSavedMistakes().filter((m) => m.gameMode === gameMode).length === 0) return 'both';
    return stored;
  });
  ```
  (Second storage read at mount is negligible; avoids a flash of a disabled-only screen.)
- New persistence effect (mirrors theme/language pattern):
  ```ts
  useEffect(() => {
    persistMistakes(mistakes);
  }, [mistakes]);
  ```
- Callback for QuizScreen:
  ```ts
  const handleMistakesChange = useCallback((entries: MistakeEntry[]) => {
    setMistakes(entries);
  }, []);
  ```
- Update `exitQuiz` to auto-fall-back when the mode's pool is empty (fires when the user leaves a fully-cleared Mistakes-Only session):
  ```ts
  const exitQuiz = () => {
    if (quizMode === 'mistakes' && mistakes.filter((m) => m.gameMode === gameMode).length === 0) {
      setQuizMode('both');
    }
    setScreen('home');
  };
  ```
  NOTE: do NOT do this fallback inside `handleMistakesChange` — flipping `quizMode` mid-session changes QuizScreen's remount key and destroys the completion flow. Only reset on exit/startup.
- Derived count for Home (scoped to current game mode, see Section 4):
  ```ts
  const mistakeCount = mistakes.filter((m) => m.gameMode === gameMode).length;
  ```
- Props wiring:
  - `HomeScreen`: add `mistakeCount={mistakeCount}`
  - `QuizScreen`: add `mistakes={mistakes}` and `onMistakesChange={handleMistakesChange}`
- Add `useCallback` to the existing React import.

### 3.6 `[MODIFY] src/components/HomeScreen.tsx`
- Props: add `mistakeCount: number` to `HomeScreenProps` and destructuring.
- Quiz-mode grid: change `grid grid-cols-3 gap-3` → `grid grid-cols-2 gap-3` (4 modes render 2×2; the 3-column layout would orphan the 4th button).
- In the `QUIZ_MODES.map`, special-case the label + disabled state:
  ```tsx
  const isMistakes = mode === 'mistakes';
  const disabled = isMistakes && mistakeCount === 0;
  // button:
  disabled={disabled}
  title={disabled ? t('home.quizMode.mistakesEmpty') : undefined}
  className={...existing... + (disabled ? ' opacity-50 cursor-not-allowed' : '')}
  // label:
  {isMistakes ? t('home.quizMode.mistakes', { count: mistakeCount }) : t(`home.quizMode.${mode}`)}
  ```
- Defensive start guard in `handleTypeCardClick`:
  ```ts
  if (quizMode === 'mistakes' && mistakeCount === 0) return;
  ```
  (The button being disabled normally prevents reaching this, but a race like another tab clearing storage must not start an empty session.)

### 3.7 `[MODIFY] src/components/QuizScreen.tsx`
- Props interface: add `mistakes: MistakeEntry[]` (initial pool snapshot) and `onMistakesChange: (entries: MistakeEntry[]) => void`; rename `onExit: _onExit` → `onExit` (now used by the completion screen). Imports: `MistakeEntry, addMistake, removeMistake` from `../utils/mistakes`; `generateMistakeQuestion` from `../utils/quizGenerator`; `Trophy` from `lucide-react`.
- `MODE_BADGE_KEYS`: add `mistakes: 'quiz.modeBadge.mistakes'` (Record is complete again for the widened union).
- Session pool ref (source of truth during the session; prop is only the initial value):
  ```ts
  const mistakePoolRef = useRef<MistakeEntry[]>(
    quizMode === 'mistakes' ? mistakes.filter((m) => m.gameMode === gameMode) : [],
  );
  const [completed, setCompleted] = useState(
    quizMode === 'mistakes' && mistakePoolRef.current.length === 0,
  );
  ```
  (Declare `completed` BEFORE the `question` initializer, mirroring the existing ordering of `seenKeysRef` → `question`.)
- Initial question initializer: branch on mode:
  ```ts
  const generated =
    quizMode === 'mistakes'
      ? (generateMistakeQuestion(mistakePoolRef.current, seenKeysRef.current, null) ??
          { types: [attackerType], key: '__empty__', resetOccurred: false })
      : generateOpponentTypes(quizMode, seenKeysRef.current, null);
  ```
  (The `?? fallback` object is unreachable in practice because App blocks starting with an empty pool; it keeps `question` non-nullable under strict TS. `completed` is `true` in that case and the fallback is never rendered.)
- `handleSelectMultiplier`: after computing `isCorrect`, before `setQuestion`:
  ```ts
  if (quizMode === 'mistakes') {
    const entry: MistakeEntry = { attackerType, defenderTypes: question.opponentTypes, gameMode };
    mistakePoolRef.current = isCorrect
      ? removeMistake(mistakePoolRef.current, entry)
      : addMistake(mistakePoolRef.current, entry);
    onMistakesChange(mistakePoolRef.current);
  }
  ```
  (On incorrect the entry is already in the pool → `addMistake` returns the same reference → React bails out; on correct the 1000 ms auto-advance timer keeps existing behavior.) Add `quizMode` and `onMistakesChange` to its `useCallback` deps.
- `handleNext`: branch generation:
  ```ts
  const generated =
    quizMode === 'mistakes'
      ? generateMistakeQuestion(mistakePoolRef.current, seenKeysRef.current, question.questionKey)
      : generateOpponentTypes(quizMode, seenKeysRef.current, question.questionKey);
  if (quizMode === 'mistakes' && generated === null) {
    setCompleted(true);
    return;
  }
  if (generated.resetOccurred) seenKeysRef.current.clear();
  // ...rest unchanged
  ```
  (TS narrows `quizMode` to `StandardQuizMode` in the false branch of the ternary, so the existing call type-checks after the generator signature change.)
- Completion UI: wrap the existing inner content (the `<div className="max-w-4xl mx-auto">` children) in:
  ```tsx
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
    <> ...existing score row, matchup, multiplier grid, feedback... </>
  )}
  ```
- No changes to Header/exit behavior: the red Exit button in the header works on the completion screen too.

## 4. Edge Cases & UX Flow

1. **0 saved mistakes** — `Mistakes Only (0)` button is `disabled` (opacity-50, `cursor-not-allowed`, `title` tooltip `home.quizMode.mistakesEmpty`); it can never be selected. `handleTypeCardClick` guards against starting an empty session. On startup, a persisted `'mistakes'` quiz mode with an empty game-mode-scoped pool is silently reset to `'both'`.
2. **Scope of the count** — The displayed count and the empty-state check use the game-mode-scoped count (`m.gameMode === gameMode`) because correct answers differ per chart. This guarantees the button is enabled exactly when a startable session exists (prevents a "Mistakes Only (3)" session that would immediately complete after switching game mode).
3. **Clearing the last mistake mid-session** — Correct answer removes the entry (pool becomes empty) → 1 s auto-advance → `generateMistakeQuestion` returns `null` → `completed` state renders the trophy/completion card. "Back to Home" (or header Exit) calls `onExit`; `exitQuiz` resets `quizMode` to `'both'` because the scoped pool is empty, so Home shows a consistent, selectable state.
4. **Session deduplication** — `seenKeysRef` is keyed by the defender-only `questionKey` (attacker + game mode are fixed per session, so it uniquely identifies the question). Wrong answers keep entries in the pool but mark them seen; when all remaining entries are seen, `resetOccurred` clears the set and redraws (same semantics as standard modes, never repeating the immediately previous question when alternatives exist). A repeated question after reset re-answered incorrectly is a no-op in storage (`addMistake` dedupes).
5. **localStorage unavailable** — `readSavedMistakes` → `[]`, `persistMistakes` no-ops (existing convention). Mistakes mode is then disabled across reloads; within one browser session, wrong answers still populate the in-memory list via `onMistakesChange`, so the feature degrades gracefully, exactly like theme/language persistence today.
6. **Corrupt/legacy data** — `readSavedMistakes` validates each entry (`isMistakeEntry`), drops invalid items, re-sorts defender types, and dedupes by `mistakeKey`; invalid JSON or non-array → `[]`. No crash path.
7. **Multi-tab** — Last write wins; no cross-tab sync (out of scope, same as existing settings).
8. **Dual-type display** — Stored sorted; each question still gets the existing 50/50 `shuffleDisplayOrder` for visual variety.
9. **Mid-quiz game mode / mode switching** — Impossible: `gameMode`/`quizMode` are fixed props per remounted session (key includes both).

## 5. Verification Checklist

Commands (run from repo root):
1. `npx tsc --noEmit` — zero type errors (strict mode).
2. `npm run build` — `tsc && vite build` succeeds.
3. (No lint script is configured in `package.json`; nothing else to run.)

Manual test scenarios (`npm run dev`, use DevTools → Application → Local Storage for `pokemon-quiz-mistakes`):
1. Fresh load (no key): Home shows `Mistakes Only (0)` disabled with tooltip; type cards still start normal quizzes.
2. Standard mode: answer one question wrong → one entry appears, e.g. `{"attackerType":"fire","defenderTypes":["grass","ice"],"gameMode":"gen6"}` (defenders sorted); repeat the same matchup wrong → still exactly one entry.
3. Answer a previously missed matchup correctly in a standard mode → entry removed from storage.
4. Game-mode scoping: miss `electric→ground` in gen6 (correct answer `0`), switch to Go and answer it correctly (correct answer `0.391`) → the gen6 entry is NOT removed; miss it in Go → a second, go-scoped entry is added.
5. Home count updates live: label reads `Mistakes Only (n)` / `まちがいのみ (n件)` in JP.
6. Start Mistakes Only: every question is one of the saved matchups; no duplicate within a session until the pool is fully seen; wrong answers keep the entry, correct answers remove it (watch storage shrink).
7. Clear all saved mistakes during the session → completion card with trophy, `quiz.completed`/`quiz.allClear` text, and a working Back-to-Home button; after returning, `quizMode` is back to `both`, `Mistakes Only (0)` disabled.
8. Reload page mid/after quiz → storage intact; a stored `'mistakes'` mode with a non-empty pool is restored on load.
9. Corrupt storage (set the key to `garbage` or `[{"attackerType":"x","defenderTypes":[]}...]`) → app loads with 0 mistakes, no console crash, button disabled.
10. JP language: mode button, badge (`quiz.modeBadge.mistakes`), completion screen all translated; EN↔JP toggle during quiz works.
11. Header Exit button works from the completion screen and from normal play alike.
