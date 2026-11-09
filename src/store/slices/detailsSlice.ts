import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPokemonById } from '@/api/pokemonApi';
import { mapPokemonDetailSummary } from '@/lib/mapPokemonMapper';
import type { PokemonDetailSummary, PokemonDetailsState } from '@/types';

const initialState: PokemonDetailsState = {
  current: null,
  loading: false,
  error: null,
};

export const fetchPokemonDetailsThunk = createAsyncThunk<PokemonDetailSummary | null, number, { rejectValue: string }>(
  'details/fetchById',
  async (id, { rejectWithValue, signal }) => {
    try {
      const dto = await fetchPokemonById(id, signal);
      return mapPokemonDetailSummary(dto);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') throw err;
      if (err instanceof Error && err.message.includes('404')) return null;
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch Pokémon details');
    }
  },
);

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    clearDetails(state) {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonDetailsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetailsThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemonDetailsThunk.rejected, (state, action) => {
        if (action.error.name === 'AbortError') return;
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
