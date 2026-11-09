import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPokemonList } from '@/api/pokemonApi';
import { mapPokemonSummary } from '@/lib/mapPokemonMapper';
import type { PokemonFetchParams, PokemonState, PokemonSummary } from '@/types';

const initialState: PokemonState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPokemonThunk = createAsyncThunk<
  PokemonSummary[],
  PokemonFetchParams,
  { rejectValue: string }
>('pokemon/fetchList', async (params, { rejectWithValue, signal }) => {
  try {
    const dtos = await fetchPokemonList(params, signal);
    return dtos.map(mapPokemonSummary);
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch Pokémon');
  }
});

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemonThunk.rejected, (state, action) => {
        if (action.error.name === 'AbortError') return;
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const pokemonReducer = pokemonSlice.reducer;