import { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectChartType, selectFavoriteIds, selectTheme } from '@/store/selectors';
import { setChartType } from '@/store/slices/uiSlice';
import { axisColors, CHART_FAVORITE_COLORS} from '@/consts';
import { formatCompact } from '@/lib/format';
import { buildTopSeries, metricValue } from '@/lib/aggregations';
import type { ChartSeries, ChartType, InteractiveStatChartProps } from '@/types';

export const InteractiveStatChart = ({ pokemons, metric, limit = 8 }: InteractiveStatChartProps) => {
  const dispatch = useAppDispatch();
  const chartType = useAppSelector(selectChartType);
  const favorites = useAppSelector(selectFavoriteIds);
  const theme = useAppSelector(selectTheme);

  const topPokemons = useMemo(
    () =>
      [...pokemons]
        .sort((a, b) => metricValue(b, metric) - metricValue(a, metric))
        .slice(0, limit),
    [pokemons, metric, limit]
  );

  const series: ChartSeries = useMemo(
    () => buildTopSeries(pokemons, metric, limit),
    [pokemons, metric, limit]
  );

  const { backgroundColors, borderColors, pointRadii } = useMemo(() => {
    const bg: string[] = [];
    const border: string[] = [];
    const radii: number[] = [];

    topPokemons.forEach(p => {
      const isFav = favorites.includes(p.id);
      bg.push(isFav ? CHART_FAVORITE_COLORS.bg : CHART_FAVORITE_COLORS.defaultBg);
      border.push(isFav ? CHART_FAVORITE_COLORS.border : CHART_FAVORITE_COLORS.defaultBorder);
      radii.push(isFav ? 8 : 5);
    });

    return { backgroundColors: bg, borderColors: border, pointRadii: radii };
  }, [topPokemons, favorites]);

  const data = useMemo<ChartData<ChartType>>(
    () => ({
      labels: series.labels,
      datasets: [
        {
          label: series.unit,
          data: series.values,
          backgroundColor: backgroundColors,
          borderColor: chartType === 'line' ? CHART_FAVORITE_COLORS.defaultBorder : borderColors,
          borderWidth: 2,
          borderRadius: 6,
          pointBackgroundColor: backgroundColors,
          pointBorderColor: borderColors,
          pointRadius: pointRadii,
          pointHoverRadius: 10,
          fill: chartType === 'line' ? { target: 'origin', above: CHART_FAVORITE_COLORS.lineFill } : false,
          tension: 0.35,
        },
      ],
    }),
    [series, backgroundColors, borderColors, pointRadii, chartType]
  );

  const options = useMemo<ChartOptions<ChartType>>(() => {
    const colors = axisColors(theme);
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: item => {
              const pokemon = topPokemons[item.dataIndex];
              const isFav = pokemon ? favorites.includes(pokemon.id) : false;
              const favMark = isFav ? ' ★ [Favorite]' : '';
              return ` ${item.parsed.y?.toLocaleString('en-US')} ${series.unit}${favMark}`;
            },
          },
        },
      },
      scales: {
        x: { ticks: { color: colors.tick }, grid: { display: false } },
        y: {
          ticks: { color: colors.tick, callback: value => formatCompact(Number(value)) },
          grid: { color: colors.grid },
        },
      },
    };
  }, [series.unit, theme, topPokemons, favorites]);

  return (
    <div className="interactive-chart">
      <div className="interactive-chart__header">
        <div className="interactive-chart__legend-hint">
          <span className="fav-legend-dot" aria-hidden="true" />
          <span>★ Highlighted Favorites</span>
        </div>
        <div className="chart-type-tabs" role="group" aria-label="Chart type toggle">
          <button
            type="button"
            className={`chart-type-tab ${chartType === 'bar' ? 'is-active' : ''}`}
            onClick={() => dispatch(setChartType('bar'))}
          >
             Bar
          </button>
          <button
            type="button"
            className={`chart-type-tab ${chartType === 'line' ? 'is-active' : ''}`}
            onClick={() => dispatch(setChartType('line'))}
          >
             Line
          </button>
        </div>
      </div>

      <div className="chart-box">
        {chartType === 'bar' ? (
          <Bar data={data as ChartData<'bar'>} options={options as ChartOptions<'bar'>} />
        ) : (
          <Line data={data as ChartData<'line'>} options={options as ChartOptions<'line'>} />
        )}
      </div>
    </div>
  );
};