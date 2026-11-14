# UI Update Request: Horizontal Matchup Layout in QuizScreen

Please update the layout of `src/components/QuizScreen.tsx` so that the **Attacker Type** and **Opponent Type(s)** are arranged side-by-side horizontally instead of stacked vertically, while stacking dual Opponent Types vertically when applicable.

Follow an explicit **Plan → Build** workflow to update the layout cleanly without breaking responsiveness or existing styling.

---

## Phase 1: Plan Mode (Analysis & Design)

Before editing any code, inspect `src/components/QuizScreen.tsx` in **Plan Mode** (read-only analysis) and plan the layout restructuring:

1. **Inspect Current Matchup Display**:
   - Locate where the Attacker Type badge(s) and Opponent Type badge(s) (along with any directional arrow or "vs" divider) are rendered in `src/components/QuizScreen.tsx`.
2. **Design Horizontal & Nested Vertical Flex Layout**:
   - **Outer Container**: Arrange the Attacker section, separator/arrow indicator (if present), and Opponent section horizontally (`flex-row`, centered vertically with `items-center` and appropriate spacing).
   - **Opponent Type Container**: Stack the Opponent Type badge(s) vertically (`flex-col`) so that single-type opponents display one badge centered vertically, and dual-type opponents display the two badges stacked vertically on the right side.
   - **Mobile Responsiveness**: Verify that horizontal spacing, badge padding, and font sizes fit comfortably on narrow mobile viewports (e.g., 360px–390px width) without overflowing or wrapping awkwardly.
3. **Output the Plan**:
   - Summarize the structural JSX/CSS changes in `src/components/QuizScreen.tsx` before proceeding to Build Mode.

---

## Phase 2: Build Mode (Implementation & Verification)

Once the plan is confirmed, switch to **Build Mode** and apply the updates to `src/components/QuizScreen.tsx`.

### 1. Layout Specifications

- **Side-by-Side Matchup Row**:
  - Place the **Attacker Type** on the left and the **Opponent Type(s)** on the right within a horizontal flex container (`flex flex-row items-center justify-center`).
  - Keep any labels (e.g., "Attacker" / "Defender" or "Opponent") aligned cleanly above or within their respective columns so the visual hierarchy remains clear.
- **Vertical Stacking for Dual Opponent Types**:
  - Inside the Opponent section, use a vertical flex column (`flex flex-col items-center gap-2`) to render `opponentTypes`.
  - When `opponentTypes.length === 1`, a single `TypeBadge` is centered vertically opposite the Attacker Type.
  - When `opponentTypes.length === 2`, the two `TypeBadge` components are stacked vertically one above the other on the right side.

### 2. Code & Quality Constraints

- **No Placeholders**: Output the complete, production-ready code for `src/components/QuizScreen.tsx` without `// TODO` comments or truncated sections.
- **Preserve Existing Behavior**: Do not alter quiz logic, multiplier selection, score tracking, or i18n keys.
- **Build Verification**: Run `npm run build` (or `tsc`) after updating the component to ensure there are no TypeScript or styling errors.