# Feature Update Request: Quiz Type Mode Selection (Single, Dual, or Both)

Please update the existing codebase to implement a new feature that allows users to toggle the quiz target between **Single-Type**, **Dual-Type**, or **Both (Mixed)** Pokémon.

---

## 1. New Requirements & Specifications

### A. Quiz Type Mode Selector in Home Screen
- **Home Screen Selector/Segmented Control**: Allow users to select the type composition of the Pokémon appearing in the quiz:
  1. **Both (Mixed)** (Default): Randomly presents both single-type and dual-type Pokémon.
  2. **Single-Type Only**: Restricts quiz questions exclusively to Pokémon with a single type.
  3. **Dual-Type Only**: Restricts quiz questions exclusively to Pokémon with two types.

### B. Dataset Filtering & Question Generation Logic
- Update the quiz generation logic so that the pool of candidate Pokémon (or type combinations) is dynamically filtered based on the selected mode:
  - **Single-Type Mode**: Filter for targets where `types.length === 1`.
  - **Dual-Type Mode**: Filter for targets where `types.length === 2`.
  - **Both Mode**: Include all available targets without type-count restrictions.
- Ensure proper error handling or fallback if a filtered dataset has insufficient entries.

### C. State Persistence & Quiz Screen Indicator
- Pass the selected quiz mode state from the Home Screen to the Quiz Screen (and optionally persist the user's preference in `localStorage`).
- Display a clear status badge or label in the Quiz Screen header indicating the active mode (e.g., "Single Type", "Dual Type", or "Mixed").

---

## 2. Updated Project Structure & Files to Generate

Please provide full, production-ready code for all new and updated files without placeholders or `// TODO` comments:

1. **`src/types/quiz.ts` (or existing types file)**:
   - Define the `QuizMode` union type (`'both' | 'single' | 'dual'`) and update the game settings interface.
2. **`src/utils/quizGenerator.ts` (or existing question logic)**:
   - Add filtering functions to select single-type, dual-type, or all targets according to the chosen `QuizMode`.
3. **`src/components/HomeScreen.tsx`**:
   - Add the UI selector for choosing between "Both", "Single-Type Only", and "Dual-Type Only" alongside the existing Game Version and Start controls.
4. **`src/components/QuizScreen.tsx`**:
   - Receive the active `quizMode` prop, display a visual mode indicator badge in the header, and ensure subsequent questions respect the selected filter.
5. **`src/App.tsx`**:
   - Manage the `quizMode` state and connect it between `HomeScreen`, the question generator, and `QuizScreen`.
6. **`src/i18n.ts`**:
   - Add localized translation strings for the quiz mode label and its three options ("Both", "Single Type Only", "Dual Type Only") in both English and Japanese.

Please output the complete code for these files so I can save them directly into the project.