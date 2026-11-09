import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/selectors';
import { fetchPokemonThunk } from '@/store/slices/pokemonSlice';
import { useDebounce } from '@/hooks/useDebounce';
import type { PokemonFetchParams } from '@/types';

export function usePokemonFetcher() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const debouncedQuery = useDebounce(filters.query.trim(), 400);
  const debouncedType = useDebounce(filters.type, 200);
  const debouncedMinHp = useDebounce(filters.minHp, 300);
  const debouncedLimit = useDebounce(filters.limit, 200);

  const request = useMemo<PokemonFetchParams>(
    () => ({
      query: debouncedQuery,
      type: debouncedType,
      minHp: debouncedMinHp,
      limit: debouncedLimit,
    }),
    [debouncedQuery, debouncedType, debouncedMinHp, debouncedLimit]
  );

  useEffect(() => {
    const promise = dispatch(fetchPokemonThunk(request));
    return () => {
      promise.abort();
    };
  }, [dispatch, request]);

  return {
    debouncing:
      debouncedQuery !== filters.query.trim() ||
      debouncedType !== filters.type ||
      debouncedMinHp !== filters.minHp ||
      debouncedLimit !== filters.limit,
  };
}