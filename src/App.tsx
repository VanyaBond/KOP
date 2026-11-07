import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { KpiCard } from '@/components/widgets/KpiCard';
import { Counter } from '@/components/widgets/Counter';
import { FilteredPokemonList } from '@/components/widgets/FilteredPokemonList';
import { ThemeToggle } from '@/components/widgets/ThemeToggle';
import { MOCK_POKEMON_DTOS, mapPokemonSummary, buildKpis } from '@/mock/data';
import { DEFAULT_COUNTER_VALUE, type Theme } from '@/types/dashboard';


function App() {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const pokemonSummaries = useMemo(() => MOCK_POKEMON_DTOS.map(mapPokemonSummary), []);
  const kpis = useMemo(() => buildKpis(pokemonSummaries), [pokemonSummaries]);

  const team1Pokemon = pokemonSummaries.slice(0, Math.ceil(pokemonSummaries.length / 2));
  const team2Pokemon = pokemonSummaries.slice(Math.ceil(pokemonSummaries.length / 2));

  return (
    <div className="app-shell" data-theme={theme}>
      <Header 
        title="⚡ Pokémon Battle Arena"
        subtitle="Choose your fighters and battle!"
      >
        <ThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
      </Header>

      <div className="battle-arena">
        {/* Team 1 Side */}
        <div className="battle-side battle-side--left">
          <div className="grid-kpis">
            {kpis.slice(0, 2).map(kpi => (
              <KpiCard key={kpi.id} kpi={kpi} side="team1" />
            ))}
          </div>
          
          <div className="glass-card">
            <h3 className="glass-card__title">⚡ Team 1 Stats</h3>
            <div className="grid-stats">
              <Counter 
                label="Team 1 Pokémon Count"
                initial={DEFAULT_COUNTER_VALUE}
                min={1}
                max={6}
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
                items={team1Pokemon} 
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
          <div className="grid-kpis">
            {kpis.slice(1, 3).map(kpi => (
              <KpiCard key={kpi.id} kpi={kpi} side="team2" />
            ))}
          </div>
          
          <div className="glass-card">
            <h3 className="glass-card__title">🏆 Team 2 Stats</h3>
            <div className="grid-stats">
              <Counter 
                label="Team 2 Pokémon Count"
                initial={DEFAULT_COUNTER_VALUE}
                min={1}
                max={6}
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
                items={team2Pokemon} 
                title="Team 2 Roster"
                colorScheme="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;