export type Theme = 'dark' | 'light';

export const DEFAULT_COUNTER_VALUE: number = 3;

export interface PokemonDto {
  id: number;
  name: string;
  height: number; 
  weight: number; 
  base_experience: number;
  types: { slot: number; type: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string; url: string } }[];
}

export interface PokemonSummary {
  id: number;
  name: string;
  types: string[];
  baseExperience: number;
  weightKg: number;
  heightM: number;
  hp: number;
  speed: number;
}

export interface KpiData {
  id: string;
  title: string;
  value: string;
  deltaPercent: number;
  deltaAbsolute: string;
  hint: string;
}