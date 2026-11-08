export type Theme = 'dark' | 'light';
export type SortField = 'name' | 'id' | 'height' | 'weight' | 'baseExperience' | 'hp' | 'speed';
export type SortDirection = 'asc' | 'desc';
export interface PokemonDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string; url: string }; is_hidden: boolean; slot: number }[];
  stats: { base_stat: number; stat: { name: string; url: string } }[];
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: { front_default: string | null; front_shiny: string | null };
}

export interface PokemonSummary {
  id: number;
  name: string;
  heightM: number;
  weightKg: number;
  baseExperience: number;
  types: string[];
  abilities: string[];
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  totalStats: number;
  sprite: string | null;
}

export interface KpiData {
  id: string;
  title: string;
  value: string;
  deltaPercent: number;
  deltaAbsolute: string;
  hint: string;
}

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface PokemonFilters {
  query: string;
  type: string;
  minHp: number;
  limit: number;
  page: number;
  pageSize: number;
}

