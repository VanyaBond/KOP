import { useEffect, useState } from 'react';
import { fetchPokemonList } from '@/api/pokemonApi';
import { mapPokemonSummary } from '@/lib/mapPokemonMapper';
import type { PokemonSummary } from '@/types/pokemon';

export type PokemonStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface PokemonState {
  status: PokemonStatus;
  data: PokemonSummary[];
  error: string | null;
  refetch: () => PokemonState;
}

export function usePokemonData(limit: number = 151): PokemonState {
  const [state, setState] = useState<PokemonState>({
    status: 'idle',
    data: [],
    error: null,
    refetch: usePokemonData
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setState({ status: 'loading', data: [], error: null, refetch: usePokemonData });
      try {
        const dtos = await fetchPokemonList(limit, controller.signal);
        const summaries = dtos.map(mapPokemonSummary);

        if (summaries.length === 0) {
          setState({ status: 'empty', data: [], error: null, refetch: usePokemonData });
        } else {
          setState({ status: 'success', data: summaries, error: null, refetch: usePokemonData });
        }
      } catch (err) {
        if ((err as { name?: string })?.name === 'AbortError') {
          return;
        }
        setState({
          status: 'error',
          data: [],
          error: err instanceof Error ? err.message : 'Unknown error',
          refetch: usePokemonData
        });
      }
    };

    void load();
    return () => controller.abort();
  }, [limit]);

  return state;
}