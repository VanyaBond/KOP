import { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error } from '@/components/ui/Error';
import { KpiCard } from '@/components/widgets/KpiCard';
import { Counter } from '@/components/widgets/Counter';
import { FilteredPokemonList } from '@/components/widgets/FilteredPokemonList';
import { PokemonTable } from '@/components/widgets/PokemonTable';
import { PokemonFilterForm } from '@/components/widgets/PokemonFilterForm';
import { Pagination } from '@/components/widgets/Pagination';
import { buildKpis } from '@/lib/aggregations';
import { DEFAULT_COUNTER_VALUE } from '@/consts';
import { usePokemon } from '@/context';
import type { PokemonFilters } from '@/types';
import type { Control, FieldErrors } from 'react-hook-form';

interface MainPageProps {
  filters: PokemonFilters;
  control: Control<PokemonFilters>;
  errors: FieldErrors<PokemonFilters>;
  isDirty: boolean;
  reset: (values?: PokemonFilters) => void;
}

export function MainPage({ filters, control, errors, isDirty, reset }: MainPageProps) {
  const { pokemons, loading, error, debouncing, retry } = usePokemon();
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
    const endIndex = startIndex + filters.pageSize;
    return pokemons.slice(startIndex, endIndex);
  }, [pokemons, filters.page, filters.pageSize]);

  const handlePageChange = (newPage: number) => {
    reset({ ...filters, page: newPage });
  };

  if (error !== null) {
    return (
      <GlassCard title="Error" subtitle="Failed to load Pokémon">
        <Error message={error} onRetry={retry} />
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

      {pokemons.length > 0 && (
        <div className="battle-arena">
          <div className="battle-side battle-side--left">
            <div className="glass-card">
              <h3 className="glass-card__title">⚡ Team 1 Stats</h3>
              <div className="grid-stats">
                <Counter 
                  label="Team 1 Pokémon Count"
                  initial={DEFAULT_COUNTER_VALUE}
                  min={1}
                  max={6}
                  onChange={setTeam1Count}
                >
                  {(value) => (
                    <p style={{ 
                      marginTop: '10px', 
                      fontSize: '13px', 
                      fontWeight: 700,
                      textAlign: 'center'
                    }}>
                      Ready Pokémon: {value}/6
                    </p>
                  )}
                </Counter>
                
                <FilteredPokemonList 
                  items={team1Pool} 
                  limit={team1Count}
                  title="Team 1 Roster"
                  colorScheme="yellow"
                />
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
                <Counter 
                  label="Team 2 Pokémon Count"
                  initial={DEFAULT_COUNTER_VALUE}
                  min={1}
                  max={6}
                  onChange={setTeam2Count}
                >
                  {(value) => (
                    <p style={{ 
                      marginTop: '10px', 
                      fontSize: '13px', 
                      fontWeight: 700,
                      textAlign: 'center'
                    }}>
                      Ready Pokémon: {value}/6
                    </p>
                  )}
                </Counter>
                
                <FilteredPokemonList 
                  items={team2Pool} 
                  limit={team2Count}
                  title="Team 2 Roster"
                  colorScheme="blue"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="grid-table">
        <GlassCard 
          title="📊 Pokémon Directory" 
          subtitle="Click on a row to view details"
          actions={
            <span className={`chip ${loading || debouncing ? 'updating-chip' : ''}`}>
              {loading || debouncing ? 'updating…' : `${pokemons.length} total`}
            </span>
          }
        >
          <PokemonFilterForm
            control={control}
            errors={errors}
            isDirty={isDirty}
            onReset={() => reset()}
          />
          
          <PokemonTable pokemons={paginatedPokemons} />

          {pokemons.length > 0 && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={pokemons.length}
              pageSize={filters.pageSize}
            />
          )}
        </GlassCard>
      </section>
    </>
  );
}