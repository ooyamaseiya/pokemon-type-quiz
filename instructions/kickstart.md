# Goal: Build a Pokémon Type Effectiveness Quiz PWA

Please act as a Senior Frontend Engineer and build a fully functional, offline-capable Progressive Web App (PWA) for a Pokémon Type Matchup Quiz using React, TypeScript, and Node.js toolchains.

## 1. Technical Stack
- **Framework & Build**: Vite + React with TypeScript
- **PWA**: `vite-plugin-pwa` (configured for full offline execution)
- **Styling & Theme**: Tailwind CSS (Dark mode support with system preference as default, plus a manual toggle)
- **Internationalization (i18n)**: `i18next` and `react-i18next` (Default language: English, Option: Japanese)
- **Icons**: `lucide-react` (Sun, Moon, Globe, Check, X, LogOut/Home)

## 2. Screen Flow & UI Requirements

### A. Home Screen
- **Type Selection**: A dropdown menu with "Select Attack Move Type" prompting the user to choose their attacker type from all 18 Gen 6+ types.
- **Start Quiz**: A button (or selection trigger) to start the quiz and transition to the Quiz Screen.

### B. Quiz Screen
- **Layout Sequence (Top to Bottom)**:
  1. **Attacker Move Type**: Displays the selected attacker type.
  2. **Opponent Pokémon Type**: Displays a randomly generated opponent (single-type or dual-type, e.g., "Grass" or "Grass / Steel").
  3. **Multiplier Option Cards**: Clickable cards for all possible multipliers (`0x`, `0.25x`, `0.5x`, `1x`, `2x`, `4x`).
- **Answer & Transition Logic**:
  - **If Correct**: Show brief "Correct!" feedback and automatically update/generate a new opponent type to proceed seamlessly to the next question.
  - **If Incorrect**: Show "Incorrect!", display the actual correct multiplier along with a detailed explanation caption (e.g., "Fire deals 2x against Grass and 2x against Steel = 4x damage."), and show a **"Next" button** so the user can review before manually proceeding.
- **Header & Navigation**:
  - An **Exit Button** located at the top-right corner to exit the quiz and return to the Home Screen.
  - Controls for switching Language (English / Japanese) and Dark Mode toggle (System / Dark / Light).
  - Persist user settings (language & theme) in `localStorage`.

## 3. Data Structure Guidelines
- Use the Gen 6+ type effectiveness data based on this reference JSON dataset: `https://raw.githubusercontent.com/jeff3388/pokemon-type-chart-resources/refs/heads/main/data/type_chart_gen6plus.json`
- Embed/hardcode this lookup dictionary data directly inside `src/data/typeData.ts` so the application runs completely offline without any runtime network requests.
- Create a calculation helper function that computes individual multipliers for each defender type and returns both the total multiplier and the calculation breakdown steps for the localized caption.

## 4. Project Structure & File Generation
Provide complete, production-ready code for the following project structure without placeholders or `// TODO` truncations:

- `package.json`: Dependencies (`react`, `react-dom`, `i18next`, `react-i18next`, `lucide-react`) and devDependencies (`typescript`, `vite`, `tailwindcss`, `vite-plugin-pwa`).
- `vite.config.ts`: Vite setup with `VitePWA` configured for offline caching.
- `tailwind.config.js`: Include `darkMode: 'class'` configuration.
- `src/data/typeData.ts`: Gen 6+ 18x18 lookup table (hardcoded from the provided JSON), type badges color mapping, and calculation logic.
- `src/i18n.ts`: `i18next` setup with English and Japanese translation files.
- `src/components/Header.tsx`: Navigation bar with title, dark mode toggle, language switcher, and the Exit button (when in quiz mode).
- `src/components/HomeScreen.tsx`: Dropdown for attack type selection and quiz start trigger.
- `src/components/QuizScreen.tsx`: Main quiz layout (Attacker badge, Random Opponent, Multiplier cards, feedback/explanation caption, and Next button on incorrect answer).
- `src/App.tsx` & `src/main.tsx`: Root state management (screen routing between Home and Quiz, current attacker type state).

Please write out all files completely so I can save them directly into a project folder and run `npm install && npm run dev`.

