import type { PokemonFilters, PokemonSummary, SortConfig, SortField } from '@/types/pokemon';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const POKEMON_LIMIT = 151;

export const DEFAULT_COUNTER_VALUE = 3;

export const SORT_FIELDS: { id: SortField; label: string; align: 'left' | 'right' }[] = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'id', label: '#', align: 'right' },
  { id: 'height', label: 'Height', align: 'right' },
  { id: 'weight', label: 'Weight', align: 'right' },
  { id: 'baseExperience', label: 'EXP', align: 'right' },
  { id: 'hp', label: 'HP', align: 'right' },
  { id: 'speed', label: 'Speed', align: 'right' },
];

export const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'SPD',
};

export const SORT_DIRECTIONS = {
  ASC: 'asc' as const,
  DESC: 'desc' as const,
} as const;

export const DEFAULT_SORT: SortConfig = {
  field: 'id',
  direction: SORT_DIRECTIONS.ASC,
} as const;

export const FIELD_KEYS: Record<SortField, keyof PokemonSummary> = {
  name: 'name',
  id: 'id',
  height: 'heightM',
  weight: 'weightKg',
  baseExperience: 'baseExperience',
  hp: 'hp',
  speed: 'speed',
};

export const DEFAULT_POKEMON_FILTERS: PokemonFilters = {
  query: '',
  type: 'all',
  minHp: 0,
  limit: 151,
  page: 1,
  pageSize: 20,
};
