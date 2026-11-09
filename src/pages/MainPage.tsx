import { useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error } from '@/components/ui/Error';
import { KpiCard } from '@/components/widgets/KpiCard';
import { Counter } from '@/components/widgets/Counter';
import { FilteredPokemonList } from '@/components/widgets/FilteredPokemonList';
import { PokemonTable } from '@/components/widgets/PokemonTable';
import { PokemonFilterForm } from '@/components/widgets/PokemonFilterForm';
import { Pagination } from '@/components/widgets/Pagination';
import { InteractiveStatChart } from '@/components/widgets/charts/InteractiveStatChart';
import { TypeDoughnutChart } from '@/components/widgets/charts/TypeDoughnutChart';
import { fetchPokemonThunk } from '@/store/slices/pokemonSlice';
import { buildKpis } from '@/lib/aggregations';
import { DEFAULT_COUNTER_VALUE, METRICS, METRIC_LABELS } from '@/consts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectDisplayPokemon, selectPokemonLoading, selectPokemonError, selectFilters, selectSelectedMetric } from '@/store/selectors';
import { setPage } from '@/store/slices/filtersSlice';
import { setSelectedMetric } from '@/store/slices/uiSlice';
import { usePokemonFilters } from '@/hooks/usePokemonFilters';

export function MainPage() {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectDisplayPokemon);
  const loading = useAppSelector(selectPokemonLoading);
  const error = useAppSelector(selectPokemonError);
  const filters = useAppSelector(selectFilters);
  const selectedMetric = useAppSelector(selectSelectedMetric);

  const { control, errors, isDirty, reset } = usePokemonFilters();

  const [team1Count, setTeam1Count] = useState<number>(DEFAULT_COUNTER_VALUE);
  const [team2Count, setTeam2Count] = useState<number>(DEFAULT_COUNTER_VALUE);

  const kpis = useMemo(() => buildKpis(pokemons), [pokemons]);
  const halfIndex = useMemo(() => Math.ceil(pokemons.length / 2), [pokemons]);

  const team1Pool = useMemo(() => pokemons.slice(0, halfIndex), [pokemons, halfIndex]);

  const team2Pool = useMemo(() => {
    const takenIds = new Set(team1Pool.slice(0, team1Count).map(p => p.id));
    return pokemons.slice(halfIndex).filter(p => !takenIds.has(p.id));
  }, [pokemons, halfIndex, team1Pool, team1Count]);

  const totalPages = Math.ceil(pokemons.length / filters.pageSize);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (filters.page - 1) * filters.pageSize;
    return pokemons.slice(startIndex, startIndex + filters.pageSize);
  }, [pokemons, filters.page, filters.pageSize]);

  useEffect(() => {
    if (filters.page > totalPages && totalPages > 0) {
      dispatch(setPage(totalPages));
    }
  }, [totalPages, filters.page, dispatch]);

  if (error !== null) {
    return (
      <GlassCard title="Error" subtitle="Failed to load Pokémon">
        <Error
          message={error}
          onRetry={() =>
            dispatch(
              fetchPokemonThunk({
                query: filters.query,
                type: filters.type,
                minHp: filters.minHp,
                limit: filters.limit,
              }),
            )
          }
        />
      </GlassCard>
    );
  }

  if (loading && pokemons.length === 0) {
    return (
      <div className="battle-arena">
        <div className="battle-side battle-side--left">
          <GlassCard title="⚡ Loading Battle Arena" subtitle="Fetching Pokémon...">
            <Loader />
          </GlassCard>
        </div>
        <div className="lightning-divider">
          <div className="lightning-bolt"></div>
          <div className="vs-badge">VS</div>
        </div>
        <div className="battle-side battle-side--right">
          <GlassCard title="🏆 Loading Battle Arena" subtitle="Fetching Pokémon...">
            <Loader />
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="grid-kpis" aria-label="Key metrics">
        {kpis.map(kpi => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      <section className="grid-charts">
        <GlassCard
          title={`Top Pokémon by ${METRIC_LABELS[selectedMetric]}`}
          subtitle="Switch between Bar & Line · favorites highlighted"
          actions={
            <div className="header__tabs" role="tablist" aria-label="Metric">
              {METRICS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedMetric === m.id}
                  className={`header__tab ${selectedMetric === m.id ? 'is-active' : ''}`}
                  onClick={() => dispatch(setSelectedMetric(m.id))}
                >
                  {m.label}
                </button>
              ))}
            </div>
          }
        >
          <InteractiveStatChart pokemons={pokemons} metric={selectedMetric} limit={10} />
        </GlassCard>

        <GlassCard title="Type distribution" subtitle="Current selection">
          <TypeDoughnutChart pokemons={pokemons} />
        </GlassCard>
      </section>

      {pokemons.length > 0 && (
        <div className="battle-arena">
          <div className="battle-side battle-side--left">
            <div className="glass-card">
              <h3 className="glass-card__title">⚡ Team 1 Stats</h3>
              <div className="grid-stats">
                <Counter label="Team 1 Pokémon Count" initial={DEFAULT_COUNTER_VALUE} min={1} max={6} onChange={setTeam1Count}>
                  {value => <p style={{ marginTop: '10px', fontSize: '13px', fontWeight: 700, textAlign: 'center' }}>Ready Pokémon: {value}/6</p>}
                </Counter>
                <FilteredPokemonList items={team1Pool} limit={team1Count} title="Team 1 Roster" colorScheme="yellow" />
              </div>
            </div>
          </div>

          <div className="lightning-divider">
            <div className="lightning-bolt"></div>
            <div className="vs-badge">VS</div>
          </div>

          <div className="battle-side battle-side--right">
            <div className="glass-card">
              <h3 className="glass-card__title">🏆 Team 2 Stats</h3>
              <div className="grid-stats">
                <Counter label="Team 2 Pokémon Count" initial={DEFAULT_COUNTER_VALUE} min={1} max={6} onChange={setTeam2Count}>
                  {value => <p style={{ marginTop: '10px', fontSize: '13px', fontWeight: 700, textAlign: 'center' }}>Ready Pokémon: {value}/6</p>}
                </Counter>
                <FilteredPokemonList items={team2Pool} limit={team2Count} title="Team 2 Roster" colorScheme="blue" />
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="grid-table">
        <GlassCard
          title="💖 Pokémon Directory"
          subtitle="Click a row to open details · star to favorite"
          actions={<span className={`chip ${loading ? 'updating-chip' : ''}`}>{loading ? 'updating…' : `${pokemons.length} total`}</span>}
        >
          <PokemonFilterForm control={control} errors={errors} isDirty={isDirty} onReset={reset} />
          <PokemonTable pokemons={paginatedPokemons} />
          {pokemons.length > 0 && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={page => dispatch(setPage(page))}
              totalItems={pokemons.length}
              pageSize={filters.pageSize}
            />
          )}
        </GlassCard>
      </section>
    </>
  );
}
