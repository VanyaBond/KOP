import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectFavoriteEntities = (state: RootState) => state.favorites.byId;

export const selectIsFavorite = (id: number) =>
  createSelector([selectFavoriteIds], ids => ids.includes(id));