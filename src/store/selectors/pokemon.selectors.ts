import { createSelector } from '@reduxjs/toolkit';
import type { PokemonSummary } from '@/types';
import type { RootState } from '../index';

export const selectPokemonItems = (state: RootState) => state.pokemon.items;
export const selectPokemonLoading = (state: RootState) => state.pokemon.loading;
export const selectPokemonError = (state: RootState) => state.pokemon.error;

export const selectDisplayPokemon = createSelector(
  [selectPokemonItems, selectFavoriteEntitiesSafe],
  (items, byId): PokemonSummary[] => {
    const presentIds = new Set(items.map(p => p.id));
    const missingFavorites = Object.values(byId).filter(p => !presentIds.has(p.id));
    return missingFavorites.length === 0 ? items : [...missingFavorites, ...items];
  }
);

function selectFavoriteEntitiesSafe(state: RootState) {
  return state.favorites.byId;
}