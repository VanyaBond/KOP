import type { Metric, Theme } from '@/types';

export const METRICS: { id: Metric; label: string }[] = [
  { id: 'hp', label: 'HP' },
  { id: 'attack', label: 'Attack' },
  { id: 'defense', label: 'Defense' },
  { id: 'speed', label: 'Speed' },
  { id: 'totalStats', label: 'Total Stats' },
];

export const METRIC_LABELS: Record<Metric, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  speed: 'Speed',
  totalStats: 'Total Stats',
};

export const METRIC_UNITS: Record<Metric, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  speed: 'SPD',
  totalStats: 'BST',
};

export const CHART_FAVORITE_COLORS = {
  bg: 'rgba(255, 51, 51, 0.85)',
  border: '#CC0000',
  defaultBg: 'rgba(0, 217, 255, 0.65)',
  defaultBorder: '#0099CC',
  lineFill: 'rgba(0, 217, 255, 0.15)',
} as const;

export const axisColors = (theme: Theme): { tick: string; grid: string } =>
  theme === 'dark'
    ? { tick: '#b0b0b0', grid: 'rgba(255, 255, 255, 0.08)' }
    : { tick: '#4a4a4a', grid: 'rgba(26, 26, 26, 0.12)' };