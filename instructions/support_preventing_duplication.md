# Feature Update Request: Prevent Duplicate Questions in Quiz Session

Please update the existing Pokémon Type Matchup Quiz web application to prevent duplicate questions from appearing consecutively or repeatedly within the same quiz session.

Follow an explicit **Plan → Build** workflow to safely analyze the current question generation logic and implement deduplication without breaking existing game rules or quiz modes.

---

## Phase 1: Plan Mode (Analysis & Design)

Before modifying any code, inspect the codebase in **Plan Mode** (read-only analysis) and establish an implementation plan covering the following points:

1. **Inspect Current Question Selection Logic**:
   - Locate where quiz questions (target Pokémon and/or attacking move types) are generated and how quiz state is managed across rounds (e.g., `src/App.tsx`, `src/components/QuizScreen.tsx`, or `src/utils/quizGenerator.ts`).
2. **Design Session History & Pool Depletion Strategy**:
   - Define how asked questions are tracked within an active session (e.g., maintaining a list or `Set` of seen question IDs / unique keys combining Pokémon ID and attacking type).
   - Define the **Pool Exhaustion (Reset) Behavior**: When all eligible questions for the current filter (e.g., Single Type only, Dual Type only, or Both) have been asked, automatically reset the history pool so the quiz continues seamlessly—while still ensuring the very first question after a reset is not identical to the immediately preceding question.
3. **Verify Mode & Rule Switching Interactions**:
   - Ensure changing the Game Version (`Gen 6+` vs. `Pokémon GO`) or Quiz Mode (`Single`, `Dual`, `Both`), or returning to the Home Screen, cleanly resets the session's seen-question history.
4. **Output the Plan**:
   - List the exact files to be modified or created, state structure changes, and edge cases before switching to Build Mode.

---

## Phase 2: Build Mode (Implementation & Verification)

Once the plan is confirmed, switch to **Build Mode** and implement the changes according to the specifications below.

### 1. Functional Specifications

- **Session-Based Deduplication**:
  - Track previously presented questions during an active quiz run so the user never sees the exact same question twice until the entire available question pool is exhausted.
  - Ensure consecutive duplicates never occur, even across pool resets or small filtered subsets.
- **State Reset Triggers**:
  - Automatically clear the seen-question history when:
    - Starting a new quiz from the Home Screen.
    - Switching between Single Type, Dual Type, or Both modes.
    - Switching between Gen 6+ and Pokémon GO rules.
- **Optional UI Feedback (Subtle)**:
  - Optionally display progress or remaining unique questions in the pool (or keep the UI clean while ensuring smooth transitions).

### 2. Code & Quality Constraints

- **No Placeholders**: Provide complete, production-ready code for all modified and created files without `// TODO` comments or truncated snippets.
- **Type Safety**: Ensure strict TypeScript compliance for question identifiers, history tracking states, and generator helper functions.
- **Build & Lint Verification**:
  - Run the project's type-check and build commands (e.g., `npm run build` / `tsc`) after implementation to confirm zero compilation or type errors.