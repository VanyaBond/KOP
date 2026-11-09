import { formatCompact, round } from '@/lib/format';
import { METRIC_UNITS } from '@/consts';
import type { ChartSeries, KpiData, Metric, PokemonSummary } from '@/types';

export const metricValue = (pokemon: PokemonSummary, metric: Metric): number =>
  pokemon[metric];

const avgOf = (list: readonly PokemonSummary[], fn: (p: PokemonSummary) => number): number =>
  list.length ? list.reduce((sum, p) => sum + fn(p), 0) / list.length : 0;

const deltaPercentOf = (pokemons: readonly PokemonSummary[], fn: (p: PokemonSummary) => number): number => {
  const half = Math.ceil(pokemons.length / 2);
  const first = avgOf(pokemons.slice(0, half), fn);
  const second = avgOf(pokemons.slice(half), fn);
  if (second === 0) return 0;
  return round(((first - second) / second) * 100);
};

export const buildKpis = (pokemons: readonly PokemonSummary[]): KpiData[] => {
  const count = pokemons.length;
  const typesCount = new Set(pokemons.flatMap(p => p.types)).size;

  return [
    {
      id: 'count',
      title: 'Pokémon in selection',
      value: formatCompact(count),
      deltaPercent: 0,
      deltaAbsolute: `${count}`,
      hint: 'matches current filters',
    },
    {
      id: 'avg-hp',
      title: 'Average HP',
      value: avgOf(pokemons, p => p.hp).toFixed(1),
      deltaPercent: deltaPercentOf(pokemons, p => p.hp),
      deltaAbsolute: (avgOf(pokemons.slice(0, Math.ceil(count / 2)), p => p.hp) - avgOf(pokemons.slice(Math.ceil(count / 2)), p => p.hp)).toFixed(1),
      hint: 'first half vs second half',
    },
    {
      id: 'avg-speed',
      title: 'Average Speed',
      value: avgOf(pokemons, p => p.speed).toFixed(1),
      deltaPercent: deltaPercentOf(pokemons, p => p.speed),
      deltaAbsolute: (avgOf(pokemons.slice(0, Math.ceil(count / 2)), p => p.speed) - avgOf(pokemons.slice(Math.ceil(count / 2)), p => p.speed)).toFixed(1),
      hint: 'first half vs second half',
    },
    {
      id: 'types',
      title: 'Unique types',
      value: String(typesCount),
      deltaPercent: 0,
      deltaAbsolute: String(typesCount),
      hint: 'across current selection',
    },
  ];
};

export const buildTopSeries = (
  pokemons: readonly PokemonSummary[],
  metric: Metric,
  limit = 8
): ChartSeries => {
  const top = [...pokemons]
    .sort((a, b) => metricValue(b, metric) - metricValue(a, metric))
    .slice(0, limit);

  return {
    labels: top.map(p => p.name),
    values: top.map(p => metricValue(p, metric)),
    unit: METRIC_UNITS[metric],
  };
};

export const buildTypeSeries = (pokemons: readonly PokemonSummary[]): ChartSeries => {
  const counts = new Map<string, number>();
  pokemons.forEach(p => p.types.forEach(t => counts.set(t, (counts.get(t) ?? 0) + 1)));

  const entries = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  return {
    labels: entries.map(([type]) => type),
    values: entries.map(([, value]) => value),
    unit: 'Pokémon',
  };
};