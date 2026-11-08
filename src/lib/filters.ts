import { TYPE_COLORS } from '@/consts/pokemonConsts';
import type { PokemonFilters } from '@/types/pokemon';

export const DEFAULT_POKEMON_FILTERS: PokemonFilters = {
  query: '',
  type: 'all',
  minHp: 0,
  limit: 151,
  page: 1,
  pageSize: 20,
};

export const TYPE_OPTIONS = ['all', ...Object.keys(TYPE_COLORS)] as const;

export const LIMIT_OPTIONS = [10, 25, 50, 100, 151] as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const isDefaultFilters = (filters: PokemonFilters): boolean =>
  filters.query === DEFAULT_POKEMON_FILTERS.query &&
  filters.type === DEFAULT_POKEMON_FILTERS.type &&
  filters.minHp === DEFAULT_POKEMON_FILTERS.minHp &&
  filters.limit === DEFAULT_POKEMON_FILTERS.limit &&
  filters.page === DEFAULT_POKEMON_FILTERS.page &&
  filters.pageSize === DEFAULT_POKEMON_FILTERS.pageSize;