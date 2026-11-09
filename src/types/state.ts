import type { PokemonDetailSummary, PokemonFilters, PokemonSummary, Theme } from './pokemon';
import type { ChartType, Metric } from './chart';

export type FiltersState = PokemonFilters;

export interface FavoritesState {
  ids: number[];
  byId: Record<number, PokemonSummary>;
}

export interface PokemonState {
  items: PokemonSummary[];
  loading: boolean;
  error: string | null;
}

export interface PokemonDetailsState {
  current: PokemonDetailSummary | null;
  loading: boolean;
  error: string | null;
}

export interface UiState {
  theme: Theme;
  chartType: ChartType;
  selectedMetric: Metric;
}
