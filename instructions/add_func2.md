# Feature Update Request: PWA Install, Game Rules Switching, and Child-Friendly Visuals

Please update the existing codebase to implement new features including PWA installation support, game version selection (Gen 6+ vs. Pokémon GO), JSON-based dataset separation, and child-friendly UI enhancements (icons for types and multipliers).

---

## 1. New Requirements & Specifications

### A. PWA Install Button
- Capture the browser's `beforeinstallprompt` event.
- Display a prominent **"Install App" button** in the Header or Home Screen when the app is eligible for installation.
- Hide the button once installed or if not supported.

### B. Game System Selection (Gen 6+ vs. Pokémon GO)
- **Home Screen Dropdown/Selector**: Allow users to pick the game rule:
  1. **Gen 6+ Main Series** (Default): Multipliers `0x`, `0.25x`, `0.5x`, `1x`, `2x`, `4x`.
  2. **Pokémon GO**: Multipliers specific to GO (e.g., `0.244x`, `0.391x`, `0.625x`, `1x`, `1.6x`, `2.56x`).
- **Dynamic Multiplier Cards**: The multiplier option cards in the Quiz Screen must dynamically update to match the selected game system's available multipliers.

### C. JSON-Based Type Matchup Datasets
- Separate the type chart datasets into JSON files:
  - `public/data/matchup-gen6.json`
  - `public/data/matchup-go.json`
- Dynamically load or switch between these JSON datasets based on the selected game version in the Home Screen.

### D. Child-Friendly Visuals for Types & Multipliers
To make the app intuitive even for children who cannot read text or understand multiplication:

1. **Type Badges (Colors + Icons)**:
   - Combine official background colors with clear visual icons for every type (e.g., Flame for Fire, Droplet for Water, Leaf for Grass, Bolt for Electric, Mountain for Rock/Ground, etc. using `lucide-react` icons or inline SVGs).
   - Ensure the type badge is easily recognizable visually without depending on reading the text label.

2. **Multiplier Cards (Visual Intuition)**:
   - Alongside numeric values (e.g., `2x` or `1.6x`), display visual intensity indicators so kids intuitively understand damage without doing math:
     - **Super Effective / Double Super Effective**: Show multiple upward arrows, stars, or fire/sword icons (e.g., 1 icon for 1.6x/2x, 2 icons for 2.56x/4x).
     - **Not Very Effective**: Show down arrows, small/shield icons, or faded symbols.
     - **Immune (0x)**: Show a barrier/cross icon (`X` or shield).
     - **Normal (1x)**: Neutral standard icon.

---

## 2. Updated Project Structure & Files to Generate

Please provide full, production-ready code for all new and updated files without placeholders or `// TODO` comments:

1. **`public/data/matchup-gen6.json` & `public/data/matchup-go.json`**:
   - Complete JSON matrix datasets for Gen 6+ and Pokémon GO type effectiveness formulas.
2. **`src/components/InstallPrompt.tsx`**:
   - Component managing the `beforeinstallprompt` state and rendering the PWA install button.
3. **`src/data/typeIcons.tsx`**:
   - Mapping between each of the 18 Pokémon types and their corresponding `lucide-react` visual icon components and color themes.
4. **`src/components/TypeBadge.tsx`**:
   - Reusable type badge component rendering both the icon, background color, and localized text label.
5. **`src/components/MultiplierCard.tsx`**:
   - Card component rendering the multiplier numeric value alongside child-friendly visual icons (swords, arrows, or shields) indicating attack strength.
6. **`src/components/HomeScreen.tsx`**:
   - Updated with Game Version Selector (Gen 6+ vs. Pokémon GO), Attack Move Type Selector, Start Button, and Install Button.
7. **`src/components/QuizScreen.tsx`**:
   - Updated layout using `TypeBadge` and `MultiplierCard`, with dynamic multiplier options based on the loaded JSON dataset.
8. **`src/i18n.ts`**:
   - Updated translation strings for game mode names ("Main Series Gen 6+", "Pokémon GO") and install prompt text in English and Japanese.

Please output the complete code for these files so I can save them directly into the project.

