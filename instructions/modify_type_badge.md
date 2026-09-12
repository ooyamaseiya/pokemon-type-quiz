# UI Refinement Request: Type Badge Shape and Icon Sizing

Please update `TypeBadge.tsx` (and any associated component styles) to adjust the visual scale and shape of the Pokémon type badges according to the specifications below.

---

## 1. Design Specifications

### A. Rounded Square Container
- Change the badge shape to a **rounded square** layout (e.g., using `aspect-square` with `rounded-2xl` or `rounded-xl` in Tailwind CSS).
- Set appropriate width/height dimensions and generous padding so both the icon and the type text label fit comfortably inside without feeling cramped, clipped, or overflowing.

### B. Scaled-Up Icon
- **Significantly increase the icon size** (e.g., using Lucide `size={36}` to `size={44}` or Tailwind classes like `w-10 h-10` / `w-12 h-12`).
- The icon should serve as the primary visual focus in the upper-center of the square badge.

### C. Centered Text & Spacing
- Maintain a vertically centered column layout (`flex flex-col items-center justify-center gap-1.5`).
- Ensure the localized type text label sits cleanly below the enlarged icon with crisp contrast and readable font sizing.

---

## 2. File to Update

Please provide the full, complete code for:

1. `src/components/TypeBadge.tsx` (and any dependent components or styling files if layout adjustments are required).

