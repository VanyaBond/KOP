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
  sprites: { 
    front_default: string | null; 
    front_shiny: string | null;
    back_default?: string | null;
    back_shiny?: string | null;
    other?: {
      'official-artwork'?: {
        front_default?: string | null;
      };
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moves: { move: { name: string; url: string }; version_group_details: any[] }[];
  species: { name: string; url: string };
}

export interface PokemonSummary {
  id: number;
  name: string;
  heightM: number;
  weightKg: number;
  baseExperience: number;
  types: string[];
  abilities: { name: string; isHidden: boolean }[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  totalStats: number;
  sprite: string | null;
  spriteBack: string | null;
  artwork: string | null;
}

export interface PokemonDetailSummary extends PokemonSummary {
  moves: string[];
  speciesName: string;
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

export interface PokemonDetailsResult {
  pokemon: PokemonDetailSummary | null;
  loading: boolean;
  error: string | null;
}

export type PokemonFetchParams = Omit<PokemonFilters, 'page' | 'pageSize'>;