import type { RootState } from '../index';

export const selectDetailsPokemon = (state: RootState) => state.details.current;
export const selectDetailsLoading = (state: RootState) => state.details.loading;
export const selectDetailsError = (state: RootState) => state.details.error;
