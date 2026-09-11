# Modification Request: Refine Auto-Transition and Add Japanese Explanation Captions

Please update the existing Pokémon Type Effectiveness Quiz codebase to implement the following two critical requirements.

## 1. Requirements

### A. Automatic Transition on Correct Answer
- When the user selects the **correct** multiplier card:
  - Immediately show visual success feedback ("Correct!" / "正解！").
  - Automatically advance to the next question (generate a new random opponent type) after a short delay (e.g., 800ms to 1000ms) so the flow feels smooth and natural without requiring extra clicks.
  - Keep the manual "Next" button only for **incorrect** answers so the user can read the explanation before proceeding.

### B. Full Japanese Localization for Explanation Captions
- Ensure that the explanation captions generated for answers fully support both **English** and **Japanese** using `i18next`.
- Localize all Pokémon type names into official Japanese terms (e.g., `Fire` -> `ほのお`, `Grass` -> `くさ`, `Steel` -> `はがね`).
- Dynamically format the breakdown text according to the currently active language setting:
  - **English Example**:
    - Single-type: `"Fire deals 2x damage against Grass."`
    - Dual-type: `"Fire deals 2x against Grass and 2x against Steel = 4x damage."`
  - **Japanese Example**:
    - Single-type: `"ほのおタイプの技は くさタイプに対して 2倍ダメージです。"`
    - Dual-type: `"ほのおタイプの技は くさタイプに対して 2倍、はがねタイプに対して 2倍 ＝ 4倍ダメージです。"`

## 2. Affected Files to Update & Re-generate
Please provide full, ready-to-use code for any modified files (no placeholders or truncated sections):

1. `src/i18n.ts` (or translation JSON files):
   - Add Japanese localized names for all 18 types.
   - Add localized sentence templates for single-type and dual-type explanation captions.
2. `src/data/typeData.ts`:
   - Update calculation helper functions to output localized explanation strings or structured data compatible with `i18next`.
3. `src/components/QuizScreen.tsx`:
   - Implement a `setTimeout` timer to auto-generate the next opponent type upon correct selection.
   - Ensure component state properly updates localized captions based on the active language.

Please output the complete code for these updated files.

