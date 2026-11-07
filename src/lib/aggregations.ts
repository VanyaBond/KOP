import { formatCompact, round } from '@/lib/format';
import type { PokemonSummary, KpiData } from '@/types/pokemon';

const medianOf = (values: readonly number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const buildKpis = (pokemons: readonly PokemonSummary[]): KpiData[] => {
  const total = pokemons.length;
  if (total === 0) return [];

  const totalBaseExp = pokemons.reduce((sum, p) => sum + p.baseExperience, 0);
  const avgWeight = pokemons.reduce((sum, p) => sum + p.weightKg, 0) / total;
  const totalHP = pokemons.reduce((sum, p) => sum + p.hp, 0);
  
  const avgStats = pokemons.reduce((sum, p) => sum + p.totalStats, 0) / total;
  const maxStatsPokemon = pokemons.reduce((max, p) => p.totalStats > max.totalStats ? p : max, pokemons[0]);
  const maxStatsShare = ((maxStatsPokemon.totalStats / avgStats) - 1) * 100;
  
  const weights = pokemons.map(p => p.weightKg);
  const medianWeight = medianOf(weights);
  const weightSkew = avgWeight > 0 ? ((medianWeight - avgWeight) / avgWeight) * 100 : 0;
  
  const typeCounts = new Map<string, number>();
  pokemons.forEach(p => p.types.forEach(t => typeCounts.set(t, (typeCounts.get(t) ?? 0) + 1)));
  const [mostCommonType, typeCount] = [...typeCounts.entries()].reduce((a, b) => b[1] > a[1] ? b : a);
  const typeShare = (typeCount / (pokemons.reduce((sum, p) => sum + p.types.length, 0))) * 100;

  return [
    {
      id: 'tracked',
      title: '⚡ Pokémon Ready',
      value: String(total),
      deltaPercent: round(typeShare),
      deltaAbsolute: `${mostCommonType}: ${typeCount} types`,
      hint: 'Most common type share',
    },
    {
      id: 'total_hp',
      title: '💪 Total HP',
      value: formatCompact(totalHP),
      deltaPercent: round(maxStatsShare),
      deltaAbsolute: `${maxStatsPokemon.name}: ${maxStatsPokemon.totalStats} BST`,
      hint: 'Highest stats Pokémon',
    },
    {
      id: 'avg_weight',
      title: '️ Avg Weight',
      value: `${avgWeight.toFixed(1)} kg`,
      deltaPercent: round(weightSkew),
      deltaAbsolute: `median ${medianWeight.toFixed(1)} kg`,
      hint: 'Median vs mean weight',
    },
    {
      id: 'total_exp',
      title: '⭐ Total EXP',
      value: formatCompact(totalBaseExp),
      deltaPercent: round((totalBaseExp / total - 50) / 50 * 100),
      deltaAbsolute: `${(totalBaseExp / total).toFixed(0)} avg per Pokémon`,
      hint: 'Combined battle experience',
    },
  ];
};