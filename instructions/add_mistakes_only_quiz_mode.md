# Task: Create Implementation Plan for Missed Questions Persistence & "Mistakes Only" Quiz Mode

Analyze the existing Pokémon Type Matchup Quiz codebase and generate a comprehensive, actionable implementation plan.

**CRITICAL CONSTRAINT**:
- **DO NOT modify any existing source code (`src/` etc.) yet.**
- Your ONLY goal in this session is to inspect the codebase, design the solution, and **save the final implementation plan as a Markdown file at `.plans/mistakes-only-mode-plan.md`** (create the `.plans/` directory if it does not exist).
- Keep the plan concise yet complete enough that a fresh session with zero prior context can immediately execute the implementation in Build Mode without re-exploring the codebase.

---

## Step 1: Codebase Inspection (Read-Only)

Inspect the relevant files in the repository to understand the current architecture:
1. **Types & State**: Locate `QuizMode`, question structures, and game rule definitions (e.g., `src/types/quiz.ts`).
2. **Question Generation & Validation**: Locate how questions are generated, deduplicated, and checked for correctness (e.g., `src/utils/quizGenerator.ts`).
3. **Storage & Persistence**: Check if any `localStorage` helpers or conventions already exist in `src/utils/` or hooks.
4. **UI Components & App Flow**: Inspect `src/App.tsx`, `src/components/HomeScreen.tsx`, `src/components/QuizScreen.tsx`, and any result/summary screens.
5. **Localization**: Inspect `src/i18n.ts` (or equivalent) to see how English and Japanese translations are structured.

---

## Step 2: Design & Specification Requirements to Include in the Plan

Based on your inspection, design the exact implementation details covering all of the following specifications:

1. **Missed Questions `localStorage` Persistence**:
   - Define a unique, serializable schema/key for missed questions (e.g., combining `attackerType` and normalized/sorted `defenderTypes` so dual-type order does not create duplicates, scoped appropriately if game rules affect multipliers).
   - Define the `localStorage` key (e.g., `pokemon-quiz-mistakes`) with `try/catch` error handling and strict TypeScript validation on read.
   - **Lifecycle**:
     - *On Incorrect Answer*: Add the matchup to `localStorage` without duplicating existing entries.
     - *On Correct Answer*: Remove the matchup from the saved mistakes list (both during `"Mistakes Only"` mode and standard modes) and sync to `localStorage`.
2. **"Mistakes Only" Quiz Mode (`'mistakes'`)**:
   - Extend `QuizMode` to include `'mistakes'`.
   - Update the Home Screen mode selector to include `"Mistakes Only"` alongside existing modes (`'both'`, `'single'`, `'dual'`), displaying the current count of saved mistakes (e.g., `Mistakes Only (5)`).
   - **Empty State**: Disable `"Mistakes Only"` selection/start when `savedMistakes.length === 0`.
   - **Quiz Execution & Session Completion**: When `'mistakes'` mode is active, draw questions exclusively from the saved mistakes pool (respecting session deduplication). Handle the edge case where all saved mistakes are answered correctly and cleared mid-session (e.g., show a completion/congratulations state and cleanly return/prompt back to the Home Screen).
3. **Localization (`src/i18n.ts`)**:
   - Specify exact English and Japanese translation keys and strings needed for `"Mistakes Only"` (`まちがいのみ`), mistake counts, empty state tooltips/messages, and completion messages.

---

## Step 3: Output Format (Save to `.plans/mistakes-only-mode-plan.md`)

Write the generated plan to `.plans/mistakes-only-mode-plan.md` using the following structure so it can be directly fed into a clean Build Mode session:

```markdown
# Implementation Plan: Missed Questions Persistence & "Mistakes Only" Quiz Mode

## 1. Codebase Findings & Existing Architecture
- Summary of relevant existing types, functions, state flow, and file paths found during inspection.

## 2. Data Schema & Storage Design
- Exact TypeScript interfaces/types to add or update.
- `localStorage` key, serialization/normalization logic, and helper function signatures.

## 3. File-by-File Implementation Plan
List every file to be created or modified, with exact details of changes:
- `[NEW] src/utils/...` (if applicable)
- `[MODIFY] src/types/...`
- `[MODIFY] src/utils/...`
- `[MODIFY] src/i18n.ts`
- `[MODIFY] src/App.tsx`
- `[MODIFY] src/components/HomeScreen.tsx`
- `[MODIFY] src/components/QuizScreen.tsx`
(Include any other affected components)

## 4. Edge Cases & UX Flow
- Detailed handling of 0 saved mistakes, clearing the last mistake mid-quiz, and session deduplication.

## 5. Verification Checklist
- Exact commands to run (`npm run build`, `tsc`, lint, etc.) and manual test scenarios to verify.
