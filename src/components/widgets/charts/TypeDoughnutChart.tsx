import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { useAppSelector } from '@/store/hooks';
import { selectTheme } from '@/store/selectors';
import { axisColors, TYPE_COLORS } from '@/consts';
import { buildTypeSeries } from '@/lib/aggregations';
import type { TypeDoughnutChartProps } from '@/types';

export const TypeDoughnutChart = ({ pokemons }: TypeDoughnutChartProps) => {
  const theme = useAppSelector(selectTheme);
  const series = useMemo(() => buildTypeSeries(pokemons), [pokemons]);

  const data = useMemo<ChartData<'doughnut'>>(
    () => ({
      labels: series.labels,
      datasets: [
        {
          data: series.values,
          backgroundColor: series.labels.map(label => TYPE_COLORS[label] ?? '#999'),
          borderColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
          borderWidth: 3,
        },
      ],
    }),
    [series, theme]
  );

  const options = useMemo<ChartOptions<'doughnut'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: axisColors(theme).tick, font: { weight: 700 } },
        },
        tooltip: {
          callbacks: {
            label: item => ` ${item.label}: ${item.parsed} ${series.unit}`,
          },
        },
      },
    }),
    [theme, series.unit]
  );

  return (
    <div className="chart-box">
      <Doughnut data={data} options={options} />
    </div>
  );
};