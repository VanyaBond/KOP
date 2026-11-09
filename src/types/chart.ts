import type { PokemonSummary } from './pokemon';

export type ChartType = 'bar' | 'line';

export type Metric = 'hp' | 'attack' | 'defense' | 'speed' | 'totalStats';

export interface ChartSeries {
  labels: string[];
  values: number[];
  unit: string;
}

export interface InteractiveStatChartProps {
  pokemons: readonly PokemonSummary[];
  metric: Metric;
  limit?: number;
}

export interface TypeDoughnutChartProps {
  pokemons: readonly PokemonSummary[];
}