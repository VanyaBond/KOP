import { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error } from '@/components/ui/Error';
import { Empty } from '@/components/ui/Empty';
import { KpiCard } from '@/components/widgets/KpiCard';
import { Counter } from '@/components/widgets/Counter';
import { FilteredPokemonList } from '@/components/widgets/FilteredPokemonList';
import { PokemonTable } from '@/components/widgets/PokemonTable';
import { ThemeToggle } from '@/components/widgets/ThemeToggle';
import { usePokemonData } from '@/hooks/usePokemonData';
import { buildKpis } from '@/lib/aggregations';
import type { Theme } from '@/types/pokemon';
import { DEFAULT_COUNTER_VALUE } from './consts/pokemonConsts';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const { status, data: pokemons, error, refetch } = usePokemonData(151);
  const retry = () => refetch();

  const [team1Count, setTeam1Count] = useState<number>(DEFAULT_COUNTER_VALUE);
  const [team2Count, setTeam2Count] = useState<number>(DEFAULT_COUNTER_VALUE);

  const kpis = useMemo(() => buildKpis(pokemons), [pokemons]);
  const halfIndex = useMemo(() => Math.ceil(pokemons.length / 2), [pokemons]);

  const team1Pool = useMemo(() => pokemons.slice(0, halfIndex), [pokemons, halfIndex]);
  const team2Pool = useMemo(() => {
    const takenIds = new Set(team1Pool.slice(0, team1Count).map(p => p.id));
    return pokemons.slice(halfIndex).filter(p => !takenIds.has(p.id));
  }, [pokemons, halfIndex, team1Pool, team1Count]);

  const renderContent = () => {
    if (status === 'idle' || status === 'loading') {
      return (
        <div className="battle-arena">
          <div className="battle-side battle-side--left">
            <GlassCard title=" Loading Battle Arena" subtitle="Fetching Pokémon...">
              <Loader />
            </GlassCard>
          </div>
          <div className="lightning-divider">
            <div className="lightning-bolt"></div>
            <div className="vs-badge">VS</div>
          </div>
          <div className="battle-side battle-side--right">
            <GlassCard title=" Loading Battle Arena" subtitle="Fetching Pokémon...">
              <Loader />
            </GlassCard>
          </div>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="battle-arena">
          <div className="battle-side battle-side--left">
            <GlassCard title="⚡ Error" subtitle="Failed to load">
              <Error message={error ?? 'Unknown error'} onRetry={retry} />
            </GlassCard>
          </div>
          <div className="lightning-divider">
            <div className="lightning-bolt"></div>
            <div className="vs-badge">VS</div>
          </div>
          <div className="battle-side battle-side--right">
            <GlassCard title="🏆 Error" subtitle="Failed to load">
              <Error message={error ?? 'Unknown error'} onRetry={retry} />
            </GlassCard>
          </div>
        </div>
      );
    }

    if (status === 'empty') {
      return (
        <div className="battle-arena">
          <div className="battle-side battle-side--left">
            <GlassCard title="⚡ Empty" subtitle="No data">
              <Empty />
            </GlassCard>
          </div>
          <div className="lightning-divider">
            <div className="lightning-bolt"></div>
            <div className="vs-badge">VS</div>
          </div>
          <div className="battle-side battle-side--right">
            <GlassCard title="🏆 Empty" subtitle="No data">
              <Empty />
            </GlassCard>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* KPI Cards */}
        <section className="grid-kpis" aria-label="Key metrics">
          {kpis.map(kpi => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        {/* Battle Arena */}
        <div className="battle-arena">
          {/* Team 1 Side */}
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

          {/* Lightning Divider */}
          <div className="lightning-divider">
            <div className="lightning-bolt"></div>
            <div className="vs-badge">VS</div>
          </div>

          {/* Team 2 Side */}
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

        {/* Pokemon Table */}
        <section className="grid-table">
          <GlassCard title="💖 Pokémon Directory" subtitle="Sortable data table with real PokéAPI data">
            <PokemonTable pokemons={pokemons} />
          </GlassCard>
        </section>
      </>
    );
  };

  return (
    <DashboardLayout
      theme={theme}
      sidebar={<Sidebar isOpen={isSidebarOpen} />}
      header={
        <Header 
          title="⚡ Pokémon Battle Arena"
          subtitle="Choose your fighters and battle!"
        >
          <button 
            className="sidebar-toggle-btn" 
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Згорнути меню" : "Розгорнути меню"}
            title={isSidebarOpen ? "Згорнути меню" : "Розгорнути меню"}
          >
            {isSidebarOpen ? '◁' : '▷'}
          </button>
          <ThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
        </Header>
      }
    >
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;