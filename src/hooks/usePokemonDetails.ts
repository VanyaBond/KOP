import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemonDetailsThunk } from '@/store/slices/detailsSlice';
import { selectDetailsError, selectDetailsLoading, selectDetailsPokemon } from '@/store/selectors';
import type { PokemonDetailsResult } from '@/types';

export interface PokemonDetailsHookResult extends PokemonDetailsResult {
  retry: () => void;
}

export function usePokemonDetails(id: number | undefined): PokemonDetailsHookResult {
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector(selectDetailsPokemon);
  const loading = useAppSelector(selectDetailsLoading);
  const error = useAppSelector(selectDetailsError);

  useEffect(() => {
    if (id === undefined || !Number.isFinite(id)) return;
    const promise = dispatch(fetchPokemonDetailsThunk(id));
    return () => {
      promise.abort();
    };
  }, [dispatch, id]);

  const retry = useCallback(() => {
    if (id === undefined || !Number.isFinite(id)) return;
    dispatch(fetchPokemonDetailsThunk(id));
  }, [dispatch, id]);

  return { pokemon, loading, error, retry };
}
