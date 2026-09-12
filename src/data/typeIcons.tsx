import {
  Feather,
  Flame,
  Snowflake,
  Bug,
  Ghost,
  Bolt,
  Circle,
  Zap,
  Leaf,
  Droplet,
  Mountain,
  Moon,
  Sparkles,
  HandFist,
  Galaxy,
  Skull,
  Stone,
} from "lucide-react";

import { Type } from "./typeData";

export interface TypeIconConfig {
  icon?: React.ElementType;
  color: string;
  iconColor: string;
}

export const TYPE_ICONS: Record<Type, TypeIconConfig> = {
  normal: { icon: Circle, color: "#A8A878", iconColor: "#FFF8F0" },
  fire: { icon: Flame, color: "#EE8130", iconColor: "#FFF8F0" },
  water: { icon: Droplet, color: "#6390F0", iconColor: "#FFFFFF" },
  electric: { icon: Zap, color: "#F7D02C", iconColor: "#FFF8F0" },
  grass: { icon: Leaf, color: "#7AC74C", iconColor: "#FFFFFF" },
  ice: { icon: Snowflake, color: "#96D9D6", iconColor: "#FFFFFF" },
  fighting: { icon: HandFist, color: "#C22E28", iconColor: "#FFFFFF" },
  poison: { icon: Skull, color: "#A33EA1", iconColor: "#FFFFFF" },
  ground: { icon: Mountain, color: "#E2BF65", iconColor: "FFF8F0" },
  flying: { icon: Feather, color: "#A98FFC", iconColor: "#FFFFFF" },
  psychic: { icon: Galaxy, color: "#F95587", iconColor: "#FFFFFF" },
  bug: { icon: Bug, color: "#A6B91A", iconColor: "#FFFFFF" },
  rock: { icon: Stone, color: "#B6A136", iconColor: "#FFFFFF" },
  ghost: { icon: Ghost, color: "#735792", iconColor: "#FFFFFF" },
  dragon: { color: "#6F35FC", iconColor: "#FFFFFF" },
  dark: { icon: Moon, color: "#705746", iconColor: "#FFFFFF" },
  steel: { icon: Bolt, color: "#B7B7CE", iconColor: "#FFFFFF" },
  fairy: { icon: Sparkles, color: "#D685AD", iconColor: "#FFFFFF" },
};
