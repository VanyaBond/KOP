import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './slices/filtersSlice';
import { detailsReducer } from './slices/detailsSlice';
import { favoritesReducer } from './slices/favoritesSlice';
import { pokemonReducer } from './slices/pokemonSlice';
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    favorites: favoritesReducer,
    pokemon: pokemonReducer,
    ui: uiReducer,
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
