# Plan: Immediate Quiz Transition & Empty Alert for "Mistakes Only" Mode

Status: **Confirmed — implementation present in working tree** (uncommitted, on top of `b3517a8` "Add mistakes only quiz mode"). This document is the instruction sheet for Plan → Build of this feature.

## 1. Objective

Selecting the **"Mistakes Only"** quiz mode on the Home Screen triggers an immediate check:

- `savedMistakes.length >= 1` (scoped to the current `gameMode`): immediately set the active quiz mode to `'mistakes'` and transition to `QuizScreen` — no separate "Start" press. The first question is drawn from the saved-mistakes pool.
- `savedMistakes.length === 0`: display a dialog informing the user that no questions are available, and remain on `HomeScreen` with the previous mode/type selection intact.

The "Mistakes Only" button is **never disabled** (no HTML `disabled` attribute); tapping it with a zero count surfaces the dialog instead of navigating.

## 2. Findings — working tree state (verified against source)

Stack: React 19 + strict TypeScript, Vite 8, Tailwind 4, i18next/react-i18next.
Verification command: `npm run build` (`tsc && vite build`). No separate lint script in `package.json`.

| # | Spec item | Implementation | Location |
|---|-----------|----------------|----------|
| 1 | Mistakes button clickable at count 0 | `disabled`/`opacity-50`/`title` (present in HEAD) removed; button always rendered active | `src/components/HomeScreen.tsx:139-151` |
| 2 | `mistakeCount >= 1` → immediate transition | `handleQuizModeSelect(mode)`: `onQuizModeChange('mistakes')` then `onStartQuiz()` in the same event | `src/components/HomeScreen.tsx:75-86` |
| 3 | `mistakeCount === 0` → dialog, stay on Home | `setNoQuestionsOpen(true)`; quiz mode and screen state untouched | `src/components/HomeScreen.tsx:80-82` |
| 4 | Dialog close: Escape key, backdrop click, OK button | `useEffect` window keydown listener gated on `noQuestionsOpen`; backdrop `onClick` closes; OK button closes (inner panel stops propagation) | `src/components/HomeScreen.tsx:34-47`, `215-244` |
| 5 | Accessibility & theming | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="no-questions-title"`, `dark:` classes on every text/surface | `src/components/HomeScreen.tsx:220-241` |
| 6 | i18n (en/jp): title, message, OK | `dialog.noQuestionsTitle`, `dialog.noQuestionsMessage`, `dialog.ok` | `src/i18n.ts:54-56` (en), `129-131` (jp) |
| 7 | First question from mistakes pool, attacker shown per question | `generateMistakeQuestion(pool, seenKeys, previousKey)` returns `GeneratedQuestion` incl. `attackerType`; `QuestionState.attackerType` drives question render; `onAttackerTypeChange` keeps `Header` in sync | `src/utils/quizGenerator.ts:116-138`, `src/components/QuizScreen.tsx:75-99,157-159`, `src/App.tsx:46,130,160` |
| 8 | Defensive guards | Persisted `'mistakes'` mode with 0 count for current `gameMode` → initial mode `'both'`; `exitQuiz` resets mode to `'both'` when pool empty after session; type-card click is a no-op when `quizMode === 'mistakes'` and count 0 | `src/App.tsx:51-57,116-121`, `src/components/HomeScreen.tsx:55-59` |

### i18n strings (final, unchanged)

| Key | en | jp |
|-----|----|----|
| `dialog.noQuestionsTitle` | `No Questions Available` | `出する問題がありません` |
| `dialog.noQuestionsMessage` | `You have no saved mistakes to review yet.` | `もう間違えた問題が記録されていないため、出題できる問題がありません。` |
| `dialog.ok` | `OK` | `OK` |

Note: JP wording differs slightly from the request's "e.g." examples (`もう` vs `まだ`, `出する` vs `出せる`). The request marks them as examples — **keep existing strings**, no change.

## 3. Build Mode steps (approved scope: Document + Verify)

1. Write this instruction sheet to `.plan/mistakes-mode-transition.md`.
2. Read-only spec-compliance re-verification of the working tree against the matrix in §2; fix any gap found (none expected).
3. Run `npm run build` → require **zero** TypeScript and build errors.
4. Report results. **No git commit** (not requested).

## 4. Edge cases (covered by the design)

- **Game-mode scoping**: `mistakeCount = mistakes.filter((m) => m.gameMode === gameMode).length`; the button label interpolates this count (`home.quizMode.mistakes` with `{{count}}`). Switching gen6 ↔ go re-evaluates the count and the immediate-transition vs dialog decision.
- **Session remount**: `startQuiz` increments `quizSession`; `QuizScreen` is keyed `${quizSession}-${gameMode}-${quizMode}`, so each start gets a fresh `seenKeysRef` and mistake-pool snapshot.
- **Pool exhaustion mid-quiz**: `generateMistakeQuestion` returns `null` only when the pool is empty → `completed` completion screen; exiting it triggers `exitQuiz` reset to `'both'` (row 8).
- **Mistake identity**: `mistakeKey` is order-independent (defenders sorted) and includes `gameMode` (gen6/go rules differ, e.g. electric→ground 0 vs 0.391). Correct answers remove the entry from the pool; wrong answers add it (deduped).
- **`localStorage` unavailable**: `readSavedMistakes()` returns `[]` → dialog path; all reads/writes are `try/catch` with safe defaults, app remains usable.
- **Dialog dismissal semantics**: closing the dialog (any of the three ways) leaves `quizMode` at its previous value; the user can still start a normal quiz via the type grid (confirm dialog) or other mode buttons.

## 5. Out of scope

- Focus trap / moving focus into the dialog on open (spec minimum — Escape + backdrop click — is already met).
- Any change to `QuizScreen` completion copy or scoring.
- Committing or pushing changes.
