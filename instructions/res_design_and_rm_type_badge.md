# Layout & Cleanup Request: Responsive Grid Fix and Unnecessary Badge Removal

Please update `HomeScreen.tsx` (and `TypeBadge.tsx` if necessary) to resolve grid display issues on larger screens and remove redundant UI elements according to the specifications below.

---

## 1. Requirements

### A. Responsive Grid Fix for Large Screens (Desktop & Tablet Landscape)

- Fix the issue where type cards collide or icons/text overlap on tablet landscape and PC screen sizes (`md:`, `lg:`, `xl:` viewports).
- **Grid Layout Adjustments**:
  - Implement a flexible Tailwind CSS grid layout for the 18 attacker type cards that smoothly adapts across breakpoints (e.g., `grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4`).
  - Ensure each `TypeBadge` container uses proper sizing constraints (e.g., `aspect-square`, `w-full`, `max-w-[...}`) with `overflow-hidden` or controlled flex spacing so that icons and text never clip, squish, or overlap regardless of container width.

### B. Removal of Redundant Type Badge

- Remove the standalone/preview type badge section located below the attacker type selection section, as selecting a card now opens the confirmation modal directly.

---

## 2. Files to Update & Re-generate

Please provide the full, ready-to-use code for:

1. `src/components/HomeScreen.tsx`:
   - Updated responsive grid styling for attacker type card selection.
   - Removal of the redundant type badge preview below the grid.
2. `src/components/TypeBadge.tsx`:
   - Responsive sizing adjustments ensuring stable icon and text alignment inside grid cells.
