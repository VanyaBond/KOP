import { useState } from 'react';
import { useForm, useWatch, type Control, type FieldErrors } from 'react-hook-form';
import { DEFAULT_POKEMON_FILTERS } from '@/lib/filters';
import type { PokemonFilters } from '@/types/pokemon';

export interface PokemonFiltersForm {
  control: Control<PokemonFilters>;
  errors: FieldErrors<PokemonFilters>;
  appliedFilters: PokemonFilters;
  isDirty: boolean;
  reset: (values?: PokemonFilters) => void;
}

interface Snapshot {
  key: string;
  filters: PokemonFilters;
}

const toSnapshot = (filters: PokemonFilters): Snapshot => ({
  key: JSON.stringify(filters),
  filters,
});

export const usePokemonFilters = (): PokemonFiltersForm => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, reset: rhfReset, formState, setValue } = useForm<PokemonFilters>({
    defaultValues: DEFAULT_POKEMON_FILTERS,
    mode: 'onChange',
  });

  const values = useWatch({ control }) as PokemonFilters;
  const { errors, isDirty } = formState;
  const hasErrors = Object.keys(errors).length > 0;

  const [snapshot, setSnapshot] = useState<Snapshot>(() => toSnapshot(DEFAULT_POKEMON_FILTERS));

  const valuesKey = JSON.stringify(values);
  if (!hasErrors && snapshot.key !== valuesKey) {
    setSnapshot({ key: valuesKey, filters: values });
  }

  const reset = (newValues?: PokemonFilters) => {
    if (newValues) {
      rhfReset(newValues);
    } else {
      rhfReset(DEFAULT_POKEMON_FILTERS);
    }
  };

  return {
    control,
    errors,
    appliedFilters: snapshot.filters,
    isDirty,
    reset,
  };
};