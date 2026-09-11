import React from 'react';

// Lucide-style custom SVG icons for Pokémon types
// Stroke-based designs consistent with lucide-react aesthetic

interface TypeIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const NormalIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const FireIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" />
    <path d="M12 18a2 2 0 0 1-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 0 1-2 2z" />
  </svg>
);

const WaterIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const ElectricIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GrassIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V8" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    <path d="M8 5c-2-2-6-2-8 0" />
    <path d="M16 5c2-2 6-2 8 0" />
  </svg>
);

const IceIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <path d="M12 2v20" />
    <path d="M2 12h20" />
  </svg>
);

const FightingIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l-2 6h-4l3 4-5 3 7 7 7-7-5-3 3-4h-4z" />
  </svg>
);

const PoisonIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L8 8h3v6h2V8h3z" />
    <circle cx="12" cy="18" r="4" />
    <path d="M12 14v4" />
    <circle cx="12" cy="18" r="1" />
  </svg>
);

const GroundIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20" />
    <path d="M4 20V12l8-8 8 8v8" />
    <path d="M9 20v-4h6v4" />
  </svg>
);

const FlyingIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12c4-8 12-10 16-6" />
    <path d="M22 12c-4-8-12-10-16-6" />
    <path d="M12 2v20" />
  </svg>
);

const PsychicIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
  </svg>
);

const BugIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="14" rx="6" ry="5" />
    <circle cx="12" cy="7" r="3" />
    <path d="M6 10L3 7" />
    <path d="M18 10l3-3" />
    <path d="M6 18l-3 3" />
    <path d="M18 18l3 3" />
    <path d="M12 19v3" />
  </svg>
);

const RockIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20l4-12 6 4 4-8 2 16z" />
    <path d="M4 20h16" />
    <path d="M8 8l4 4" />
  </svg>
);

const GhostIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2h6v6c2 0 3 1 3 3v7c0 1-1 2-2 2H8c-1 0-2-1-2-2v-7c0-2 1-3 3-3V2z" />
    <circle cx="9" cy="11" r="1" />
    <circle cx="15" cy="11" r="1" />
    <path d="M10 16h4" />
  </svg>
);

const DragonIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-4 0-6 3-6 7 0 3 2 5 4 6l-2 7h12l-2-7c2-1 4-3 4-6 0-4-2-7-6-7z" />
    <circle cx="9" cy="9" r="1" />
    <circle cx="15" cy="9" r="1" />
    <path d="M10 14h4" />
  </svg>
);

const DarkIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SteelIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12" />
    <path d="M6 12h12" />
    <path d="M8 8l8 8" />
    <path d="M16 8l-8 8" />
  </svg>
);

const FairyIcon: React.FC<TypeIconProps> = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 4.8 5.4.8-4 3.9.9 5.5L12 15l-4.7 2.7.9-5.5-4-3.9 5.4-.8z" />
  </svg>
);

export const TypeIcons: Record<string, React.FC<TypeIconProps>> = {
  normal: NormalIcon,
  fire: FireIcon,
  water: WaterIcon,
  electric: ElectricIcon,
  grass: GrassIcon,
  ice: IceIcon,
  fighting: FightingIcon,
  poison: PoisonIcon,
  ground: GroundIcon,
  flying: FlyingIcon,
  psychic: PsychicIcon,
  bug: BugIcon,
  rock: RockIcon,
  ghost: GhostIcon,
  dragon: DragonIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  fairy: FairyIcon,
};

export default TypeIcons;
