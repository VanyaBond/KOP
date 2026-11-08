import type { RegisterOptions } from 'react-hook-form';
import { LIMIT_OPTIONS, TYPE_OPTIONS, PAGE_SIZE_OPTIONS } from '@/lib/filters';
import type { PokemonFilters } from '@/types/pokemon';

export const QUERY_RULES: RegisterOptions<PokemonFilters, 'query'> = {
  maxLength: { value: 40, message: 'Keep the search under 40 characters' },
  validate: (value: string) =>
    value.trim() === '' ||
    value.trim().length >= 2 ||
    'Search needs at least 2 characters',
};

export const TYPE_RULES: RegisterOptions<PokemonFilters, 'type'> = {
  required: 'Type is required',
  validate: (value: string) =>
    (TYPE_OPTIONS as readonly string[]).includes(value) || 'Pick a type from the list',
};

export const MIN_HP_RULES: RegisterOptions<PokemonFilters, 'minHp'> = {
  min: { value: 0, message: 'Min HP cannot be negative' },
  max: { value: 255, message: 'Max HP is 255' },
};

export const LIMIT_RULES: RegisterOptions<PokemonFilters, 'limit'> = {
  validate: (value: number) =>
    (LIMIT_OPTIONS as readonly number[]).includes(value) || 'Pick one of the limit presets',
};

export const PAGE_SIZE_RULES: RegisterOptions<PokemonFilters, 'pageSize'> = {
  validate: (value: number) =>
    (PAGE_SIZE_OPTIONS as readonly number[]).includes(value) || 'Pick one of the page size options',
};