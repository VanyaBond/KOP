import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoritesState, PokemonSummary } from '@/types';

const initialState: FavoritesState = {
  ids: [],
  byId: {},
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<PokemonSummary | number>) {
      const payload = action.payload;
      const id = typeof payload === 'number' ? payload : payload.id;
      const index = state.ids.indexOf(id);

      if (index >= 0) {
        state.ids.splice(index, 1);
        delete state.byId[id];
      } else {
        state.ids.push(id);
        if (typeof payload !== 'number') {
          state.byId[id] = payload;
        }
      }
    },
    clearFavorites(state) {
      state.ids = [];
      state.byId = {};
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;