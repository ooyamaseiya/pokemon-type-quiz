# UI & Terminology Update Request: Card-Based Type Selection and Franchise-Accurate Multiplier Labels

Please update `HomeScreen.tsx`, `QuizScreen.tsx`, and localization files (`i18n.ts` / translation JSONs) to implement card-based attacker type selection with a confirmation dialog, and replace technical/literal multiplier labels with official Pokémon game terminology.

---

## 1. Requirements

### A. Attacker Type Card Selection & Confirmation Dialog

- **Card Grid on Home Screen**:
  - Remove the attacker type `<select>` dropdown menu.
  - Render all 18 attacker types as a responsive grid of interactive icon cards using the rounded square `TypeBadge` component.
- **Confirmation Dialog**:
  - Clicking any type card triggers a confirmation dialog/modal with **"OK"** and **"Cancel"** buttons.
  - **Cancel**: Closes the dialog and remains on the Home Screen.
  - **OK**: Confirms the selected type and immediately starts the quiz (transitions to the Quiz Screen).

### B. Franchise-Accurate Effectiveness Text Labels

Replace literal descriptions (like "無効", "効果なし", etc.) with official in-game battle terms in both Japanese and English.

#### Terminology Mappings:

- **0x**:
  - **JA**: `"こうかなし"`
  - **EN**: `"No Effect"` / `"It had no effect..."`
- **0.25x / 0.391x / 0.5x / 0.625x**:
  - **JA**: `"いまひとつ"`
  - **EN**: `"Not Very Effective"`
- **1x**:
  - **JA**: `"こうかあり"`
  - **EN**: `"Normal"`
- **1.6x / 2x / 2.56x / 4x**:
  - **JA**: `"こうかばつぐん"`
  - **EN**: `"Super Effective"`

Display these official terms on the `MultiplierCard` components, answer feedback popups, and explanation captions in `QuizScreen.tsx`.

---

## 2. Files to Update & Re-generate

Please provide the full, ready-to-use code for:

1. `src/i18n.ts`: Updated translation dictionary containing the official game effectiveness terms for both Japanese and English.
2. `src/components/HomeScreen.tsx`: Attacker type card grid and Confirmation Dialog with "OK" and "Cancel" actions.
3. `src/components/MultiplierCard.tsx`: Card component displaying the official effectiveness label alongside the multiplier value and visual icons.
4. `src/components/QuizScreen.tsx`: Updated answer evaluation and explanation feedback using the new terms.
