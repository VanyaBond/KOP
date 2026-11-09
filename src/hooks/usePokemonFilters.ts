import { useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/selectors';
import { setFilters, resetFilters } from '@/store/slices/filtersSlice';
import { DEFAULT_POKEMON_FILTERS } from '@/consts';
import type { PokemonFilters } from '@/types';

export interface PokemonFiltersForm {
  control: ReturnType<typeof useForm<PokemonFilters>>['control'];
  errors: ReturnType<typeof useForm<PokemonFilters>>['formState']['errors'];
  appliedFilters: PokemonFilters;
  isDirty: boolean;
  reset: () => void;
}

export const usePokemonFilters = (): PokemonFiltersForm => {
  const dispatch = useAppDispatch();
  const globalFilters = useAppSelector(selectFilters);

  const {
    control,
    reset: formReset,
    formState: { errors, isDirty },
  } = useForm<PokemonFilters>({
    defaultValues: globalFilters,
    mode: 'onChange',
  });

  const values = useWatch({ control });
  const hasErrors = Object.keys(errors).length > 0;
  const prevSerializedRef = useRef<string>('');

  useEffect(() => {
    if (hasErrors || !values) return;

    const next: PokemonFilters = {
      query: values.query ?? '',
      type: values.type ?? 'all',
      minHp: Number(values.minHp ?? 0),
      limit: Number(values.limit ?? DEFAULT_POKEMON_FILTERS.limit),
      pageSize: Number(values.pageSize ?? DEFAULT_POKEMON_FILTERS.pageSize),
      page: globalFilters.page,
    };

    const filtersChanged =
      next.query !== globalFilters.query ||
      next.type !== globalFilters.type ||
      next.minHp !== globalFilters.minHp ||
      next.limit !== globalFilters.limit ||
      next.pageSize !== globalFilters.pageSize;

    if (filtersChanged) next.page = 1;

    const serialized = JSON.stringify(next);
    if (prevSerializedRef.current !== serialized) {
      prevSerializedRef.current = serialized;
      dispatch(setFilters(next));
    }
  }, [values, hasErrors, dispatch, globalFilters]);

  const handleReset = () => {
    formReset(DEFAULT_POKEMON_FILTERS);
    prevSerializedRef.current = JSON.stringify(DEFAULT_POKEMON_FILTERS);
    dispatch(resetFilters());
  };

  return {
    control,
    errors,
    appliedFilters: globalFilters,
    isDirty,
    reset: handleReset,
  };
};