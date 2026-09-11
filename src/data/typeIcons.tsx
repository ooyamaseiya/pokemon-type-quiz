import {
  Flame,
  Droplet,
  Leaf,
  Zap,
  Snowflake,
  Hammer,
  Skull,
  Mountain,
  Wind,
  Sparkles,
  Bug,
  Shield,
  Ghost,
  Octagon,
  Moon,
  Sword,
  Heart,
  Circle
} from 'lucide-react';

import { Type } from './typeData';

export interface TypeIconConfig {
  icon: React.ElementType;
  color: string;
  iconColor: string;
}

export const TYPE_ICONS: Record<Type, TypeIconConfig> = {
  normal: { icon: Circle, color: '#A8A878', iconColor: '#6B6B4A' },
  fire: { icon: Flame, color: '#EE8130', iconColor: '#FFF8F0' },
  water: { icon: Droplet, color: '#6390F0', iconColor: '#FFFFFF' },
  electric: { icon: Zap, color: '#F7D02C', iconColor: '#8B7500' },
  grass: { icon: Leaf, color: '#7AC74C', iconColor: '#FFFFFF' },
  ice: { icon: Snowflake, color: '#96D9D6', iconColor: '#1E5F5E' },
  fighting: { icon: Hammer, color: '#C22E28', iconColor: '#FFFFFF' },
  poison: { icon: Skull, color: '#A33EA1', iconColor: '#FFFFFF' },
  ground: { icon: Mountain, color: '#E2BF65', iconColor: '#5C4A1E' },
  flying: { icon: Wind, color: '#A98FFC', iconColor: '#FFFFFF' },
  psychic: { icon: Sparkles, color: '#F95587', iconColor: '#FFFFFF' },
  bug: { icon: Bug, color: '#A6B91A', iconColor: '#FFFFFF' },
  rock: { icon: Shield, color: '#B6A136', iconColor: '#FFFFFF' },
  ghost: { icon: Ghost, color: '#735792', iconColor: '#FFFFFF' },
  dragon: { icon: Octagon, color: '#6F35FC', iconColor: '#FFFFFF' },
  dark: { icon: Moon, color: '#705746', iconColor: '#FFFFFF' },
  steel: { icon: Sword, color: '#B7B7CE', iconColor: '#4A4A5A' },
  fairy: { icon: Heart, color: '#D685AD', iconColor: '#FFFFFF' },
};
