import { useCallback, useMemo, useState } from 'react';
import { fetchPokemonList } from '@/api/pokemonApi';
import { mapPokemonSummary } from '@/lib/mapPokemonMapper';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import type { PokemonDto, PokemonFilters, PokemonSummary } from '@/types/pokemon';

export interface PokemonQueryResult {
  pokemons: PokemonSummary[];
  loading: boolean;
  error: string | null;
  debouncing: boolean;
  retry: () => void;
}

export function usePokemonQuery(filters: PokemonFilters): PokemonQueryResult {
  const debouncedQuery = useDebounce(filters.query.trim(), 400);
  const debouncedType = useDebounce(filters.type, 200);
  const debouncedMinHp = useDebounce(filters.minHp, 300);
  const [attempt, setAttempt] = useState(0);

  const request = useMemo<PokemonFilters>(
    () => ({
      ...filters,
      query: debouncedQuery,
      type: debouncedType,
      minHp: debouncedMinHp,
    }),
    [filters, debouncedQuery, debouncedType, debouncedMinHp]
  );

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchPokemonList(request, signal),
    [request, attempt]
  );

  const { data, loading, error } = useFetch<PokemonDto[]>(fetcher);
  const pokemons = useMemo(() => (data ?? []).map(mapPokemonSummary), [data]);

  return {
    pokemons,
    loading,
    error,
    debouncing: debouncedQuery !== filters.query.trim(),
    retry: () => setAttempt(curr => curr + 1),
  };
}