# Feature Update Request: Icon-Based Theme Toggle & LocalStorage Persistence

Please update the existing Pokémon Type Matchup Quiz web application to replace the current theme selector with a single-button **icon toggle** (cycling through System, Light, and Dark modes) and persist both **theme** and **language** preferences in `localStorage`.

Follow an explicit **Plan → Build** workflow to safely inspect the current theme/i18n implementation and apply the updates cleanly.

---

## Phase 1: Plan Mode (Analysis & Design)

Before modifying any code, inspect the codebase in **Plan Mode** (read-only analysis) and establish an implementation plan covering the following points:

1. **Inspect Current Theme & Language Management**:
   - Locate where the theme state (`system`, `light`, `dark`) and language state (`ja`, `en`, etc.) are currently defined, toggled, and applied to the DOM (e.g., `document.documentElement.classList` or Tailwind `dark` class, `src/App.tsx`, `src/i18n.ts`, or Header/Home components).
2. **Design Icon-Tap Theme Toggle Cycle**:
   - Define a single clickable icon button that cycles smoothly through the three theme states on each tap:
     - `system` → `light` → `dark` → `system`
   - Select clear, intuitive icons (e.g., Monitor/Laptop icon for **System**, Sun icon for **Light**, Moon icon for **Dark** using `lucide-react` or existing icon components) along with accessible `aria-label` / `title` attributes.
3. **Design `localStorage` Persistence & Hydration**:
   - Define dedicated storage keys (e.g., `pokemon-quiz-theme` and `pokemon-quiz-lang`).
   - Plan initial state lazy-loading from `localStorage` with safe fallback defaults (`system` for theme, browser language or default language for i18n) and `try/catch` guards for restricted storage environments.
   - Ensure `system` theme mode dynamically listens to `window.matchMedia('(prefers-color-scheme: dark)')` changes when active.
4. **Output the Plan**:
   - List the exact files to be modified or created, state hooks/effects to update, and edge cases before switching to Build Mode.

---

## Phase 2: Build Mode (Implementation & Verification)

Once the plan is confirmed, switch to **Build Mode** and implement the updates according to the specifications below.

### 1. Functional Specifications

- **Icon-Tap Theme Toggle**:
  - Replace any dropdown or multi-button theme selector with a single compact icon button.
  - Clicking/tapping the button cycles through `'system'`, `'light'`, and `'dark'`, updating the displayed icon immediately to reflect the active mode.
- **Persistent Theme State (`localStorage`)**:
  - Save the selected theme mode (`'system' | 'light' | 'dark'`) to `localStorage` whenever it changes.
  - Restore the saved theme automatically on page reload without visual flicker or reset to default.
- **Persistent Language State (`localStorage`)**:
  - Save the selected language code (e.g., `'ja'` / `'en'`) to `localStorage` whenever the user switches languages.
  - Initialize the i18n / language state from `localStorage` on startup so the user's preferred language persists across sessions.

### 2. Code & Quality Constraints

- **No Placeholders**: Provide complete, production-ready code for all modified and created files without `// TODO` comments or truncated snippets.
- **Type Safety**: Ensure strict TypeScript types for theme modes (`'system' | 'light' | 'dark'`), supported language codes, and storage helper functions.
- **Build & Lint Verification**:
  - Run the project's type-check and build commands (e.g., `npm run build` / `tsc`) after implementation to confirm zero compilation or type errors.