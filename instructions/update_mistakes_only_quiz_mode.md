# Feature Update Request: Immediate Quiz Transition & Empty Alert for "Mistakes Only" Mode

Please update the existing Pokémon Type Matchup Quiz web application so that selecting the **"Mistakes Only"** quiz mode on the Home Screen triggers an immediate check:
- If there is **at least 1 saved mistake**, immediately start the quiz and transition to the `QuizScreen`.
- If there are **0 saved mistakes**, display a dialog informing the user that there are no questions available to present, and remain on the `HomeScreen`.

Follow an explicit **Plan → Build** workflow, saving the implementation plan inside the `.plan/` directory during Plan Mode before modifying application source code.

---

## Phase 1: Plan Mode (Analysis, Design & `.plan/` Documentation)

Before modifying any application source code, inspect the codebase in **Plan Mode** and generate a detailed implementation plan file inside `.plan/`:

1. **Inspect Current Home Screen Mode Selection & Navigation Flow**:
   - Locate how quiz modes (`both`, `single`, `dual`, `mistakes`) are selected in `src/components/HomeScreen.tsx` and how the quiz start/navigation callback (`onStartQuiz` or screen state in `src/App.tsx`) is triggered.
2. **Design Immediate Transition vs. Empty State Dialog**:
   - **Button Interactivity**: Ensure the `"Mistakes Only"` button remains clickable even when the saved mistakes count is `0` (do not disable the button via the HTML `disabled` attribute, so tapping it triggers the alert dialog).
   - **Selection Handler Logic**:
     - When `savedMistakes.length >= 1`: Set the active quiz mode to `'mistakes'` and immediately invoke the start-quiz / screen-transition handler so the user jumps directly into `QuizScreen` without needing to press a separate "Start" button.
     - When `savedMistakes.length === 0`: Do not change the screen or start the quiz; instead, open a clear, user-friendly dialog (either a styled modal component consistent with the app's UI or a clean alert dialog) explaining that no missed questions are currently saved, and keep the user on `HomeScreen`.
3. **Verify Localization (`src/i18n.ts`)**:
   - Plan localized dialog title, message, and close/OK button text in both Japanese (e.g., 「出せる問題がありません」「まだ間違えた問題が記録されていないため、出題できる問題がありません。」) and English (e.g., `"No Questions Available"`, `"You have no saved mistakes to review yet."`).
4. **Generate Plan File in `.plan/`**:
   - Create the `.plan/` directory if it does not already exist, and write the complete architectural and file-by-file implementation plan to `.plan/mistakes-mode-transition.md`.
   - Include target files to modify, component state/props updates, dialog UI structure, and edge cases in `.plan/mistakes-mode-transition.md` before proceeding to Build Mode.

---

## Phase 2: Build Mode (Implementation & Verification)

Once `.plan/mistakes-mode-transition.md` is generated and confirmed, switch to **Build Mode** and implement the updates according to the specifications below.

### 1. Functional Specifications

- **Immediate Transition (`savedMistakes.length >= 1`)**:
  - Tapping/clicking the `"Mistakes Only"` option immediately sets the quiz mode to `'mistakes'` and transitions directly to `QuizScreen` with the first question drawn from the saved mistakes pool.
- **Empty Mistakes Dialog (`savedMistakes.length === 0`)**:
  - Tapping/clicking the `"Mistakes Only"` option when `savedMistakes.length === 0` opens a modal/dialog informing the user that there are no questions available (`出せる問題がない`).
  - Dismissing the dialog keeps the user on `HomeScreen` with their previous mode selection intact.
- **UI & Accessibility**:
  - Ensure the dialog is keyboard-accessible (`Escape` key or backdrop click closes it), visually readable in both Light and Dark modes, and matches the child-friendly aesthetic of the app.

### 2. Code & Quality Constraints

- **No Placeholders**: Provide complete, production-ready code for all modified and created files without `// TODO` comments or truncated snippets.
- **Type Safety**: Ensure strict TypeScript compliance across props, callbacks, and state definitions.
- **Build & Lint Verification**:
  - Run the project's type-check and build commands (e.g., `npm run build` / `tsc`) after implementation to confirm zero compilation or type errors.