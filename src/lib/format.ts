export const formatCompact = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
  return formatter.format(value);
};

export const formatSignedPercent = (value: number): string => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

export const round = (value: number): number => Math.round(value * 10) / 10;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);