import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { usePokemonQuery } from '@/hooks/usePokemonQuery';
import type { PokemonCtx, PokemonFilters, PokemonSummary } from '@/types';

const PokemonContext = createContext<PokemonCtx | null>(null);

interface PokemonProviderProps {
  children: ReactNode;
  filters: PokemonFilters;
}

export function PokemonProvider({ children, filters }: PokemonProviderProps) {
  const query = usePokemonQuery(filters);

  const findById = useMemo(
    () => (id: number): PokemonSummary | undefined => {
      return query.pokemons.find(p => p.id === id);
    },
    [query.pokemons]
  );

  const value = useMemo<PokemonCtx>(
    () => ({
      pokemons: query.pokemons,
      loading: query.loading,
      error: query.error,
      debouncing: query.debouncing,
      retry: query.retry,
      findById,
    }),
    [query, findById]
  );

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePokemon(): PokemonCtx {
  const ctx = useContext(PokemonContext);
  if (!ctx) {
    throw new Error('usePokemon must be used within <PokemonProvider>');
  }
  return ctx;
}