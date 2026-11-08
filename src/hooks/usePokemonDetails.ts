import { useCallback, useMemo } from 'react';
import { fetchPokemonById } from '@/api/pokemonApi';
import { mapPokemonDetailSummary } from '@/lib/mapPokemonMapper';
import { useFetch } from '@/hooks/useFetch';
import type { PokemonDto, PokemonDetailsResult } from '@/types';

export function usePokemonDetails(id: number | undefined): PokemonDetailsResult {
  const fetcher = useCallback(
    async (signal: AbortSignal): Promise<PokemonDto | null> => {
      if (id === undefined || id === null) return null;
      return fetchPokemonById(id, signal);
    },
    [id]
  );

  const { data, loading, error } = useFetch<PokemonDto | null>(fetcher);
  const pokemon = useMemo(() => (data ? mapPokemonDetailSummary(data) : null), [data]);

  return { pokemon, loading, error };
}