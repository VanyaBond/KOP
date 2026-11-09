import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_POKEMON_FILTERS } from '@/consts';
import type { FiltersState, PokemonFilters } from '@/types';

const initialState: FiltersState = DEFAULT_POKEMON_FILTERS;

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(_state, action: PayloadAction<PokemonFilters>) {
      return action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.page = 1;
    },
    resetFilters() {
      return DEFAULT_POKEMON_FILTERS;
    },
  },
});

export const { setFilters, setPage, setPageSize, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;