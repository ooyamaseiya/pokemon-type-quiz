# UI Refinement Request: Replace Custom Icons with Standard Lucide Icons

Please update `typeIcons.tsx` and `TypeBadge.tsx` to use official `lucide-react` icons according to the exact mappings specified below, discarding custom SVGs.

---

## 1. Icon Mapping Specifications (`lucide-react`)

Import and map only the following specific icons from `lucide-react`:

- **Flying (ひこう)**: `import { Feather } from 'lucide-react';`
- **Fire (ほのお)**: `import { Flame } from 'lucide-react';`
- **Ice (こおり)**: `import { Snowflake } from 'lucide-react';`
- **Bug (むし)**: `import { Bug } from 'lucide-react';`
- **Rock (いわ)**: `import { Stone } from 'lucide-react';`
- **Ground (じめん)**: `import { Mountain } from 'lucide-react';`
- **Fighting (かくとう)**: `import { HandFist } from 'lucide-react';`
- **Ghost (ゴースト)**: `import { Ghost } from 'lucide-react';`
- **Steel (はがね)**: `import { Bolt } from 'lucide-react';`
- **Normal (ノーマル)**: `import { Circle } from 'lucide-react';`
- **Electric (でんき)**: `import { Zap } from 'lucide-react';`
- **Psychic (エスパー)**: `import { Galaxy } from 'lucide-react';`
- **Grass (くさ)**: `import { Leaf } from 'lucide-react';`

*Important Rule*: Any type NOT listed above (e.g., Water, Poison, Dragon, Dark, Fairy) **must NOT render an icon**.

---

## 2. Layout & Rendering Rules

- **`TypeBadge.tsx` Layout**:
  - Maintain a centered vertical layout (`flex flex-col items-center justify-center`).
  - **When an icon exists**: Display the `lucide-react` icon on top/center and the localized type name label directly underneath.
  - **When NO icon exists**: Render only the localized type name label centered within the badge.

---

## 3. Files to Re-generate

Please provide the full, ready-to-use code for:

1. `src/data/typeIcons.tsx`: Mapping object for `lucide-react` icons based on the rules above.
2. `src/components/TypeBadge.tsx`: Updated component with conditional icon rendering and centered layout.

