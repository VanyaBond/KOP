import { Link, useParams } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error } from '@/components/ui/Error';
import { usePokemonDetails } from '@/hooks/usePokemonDetails';
import { usePokemon } from '@/context';
import { ROUTES, TYPE_COLORS } from '@/consts';

export function PokemonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id, 10) : undefined;
  
  const { pokemon, loading, error } = usePokemonDetails(parsedId);
  const { retry } = usePokemon();

  if (loading) {
    return (
      <GlassCard title="Pokémon Details" subtitle="Loading...">
        <Loader />
      </GlassCard>
    );
  }

  if (error) {
    return (
      <GlassCard title="Error" subtitle="Failed to load Pokémon details">
        <Error message={error} onRetry={retry} />
      </GlassCard>
    );
  }

  if (!pokemon || !parsedId) {
    return (
      <GlassCard
        title="Pokémon not found"
        subtitle={id ? `No match for ID "${id}"` : 'Missing Pokémon ID'}
        actions={
          <Link to={ROUTES.HOME} className="back-link">
            ← Back to overview
          </Link>
        }
      >
        <div className="not-found">
          <span className="not-found__icon" aria-hidden="true">
            ❓
          </span>
          <p className="not-found__title">We couldn't locate this Pokémon.</p>
          <p className="not-found__hint">
            Try going back and picking another row, or check that the URL is correct.
          </p>
        </div>
      </GlassCard>
    );
  }

  const stats = [
    { label: 'HP', value: pokemon.hp, color: '#FF5555' },
    { label: 'Attack', value: pokemon.attack, color: '#F08030' },
    { label: 'Defense', value: pokemon.defense, color: '#F8D030' },
    { label: 'Sp. Attack', value: pokemon.specialAttack, color: '#6890F0' },
    { label: 'Sp. Defense', value: pokemon.specialDefense, color: '#78C850' },
    { label: 'Speed', value: pokemon.speed, color: '#F85888' },
  ];

  const maxStat = 255;

  return (
    <GlassCard
      title={
        <div className="details-title">
          <span className="details-number">#{String(pokemon.id).padStart(3, '0')}</span>
          <span className="details-name">{pokemon.name}</span>
        </div>
      }
      subtitle={`${pokemon.speciesName} · ${pokemon.types.join(', ')}`}
      actions={
        <Link to={ROUTES.HOME} className="back-link">
          ← Back to overview
        </Link>
      }
    >
      <section className="details-grid">
        <div className="details-section details-section--sprites">
          <h3 className="details-section__title">Sprites</h3>
          <div className="details-sprites">
            {pokemon.artwork && (
              <div className="details-sprite-box">
                <img src={pokemon.artwork} alt={pokemon.name} className="details-artwork" />
                <span className="details-sprite-label">Official Artwork</span>
              </div>
            )}
            {pokemon.sprite && (
              <div className="details-sprite-box">
                <img src={pokemon.sprite} alt={`${pokemon.name} front`} className="details-sprite" />
                <span className="details-sprite-label">Front</span>
              </div>
            )}
            {pokemon.spriteBack && (
              <div className="details-sprite-box">
                <img src={pokemon.spriteBack} alt={`${pokemon.name} back`} className="details-sprite" />
                <span className="details-sprite-label">Back</span>
              </div>
            )}
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Basic Info</h3>
          <dl className="details-dl">
            <dt>Height</dt>
            <dd>{pokemon.heightM} m</dd>
            <dt>Weight</dt>
            <dd>{pokemon.weightKg} kg</dd>
            <dt>Base Experience</dt>
            <dd>{pokemon.baseExperience}</dd>
            <dt>Total Stats</dt>
            <dd className="details-total-stats">{pokemon.totalStats}</dd>
          </dl>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Types</h3>
          <div className="details-chips">
            {pokemon.types.map(type => (
              <span
                key={type}
                className="chip chip--type"
                style={{ backgroundColor: TYPE_COLORS[type] || '#999' }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Abilities</h3>
          <div className="details-chips">
            {pokemon.abilities.map(ability => (
              <span
                key={ability.name}
                className={`chip ${ability.isHidden ? 'chip--hidden' : ''}`}
              >
                {ability.name}
                {ability.isHidden && <span className="chip-badge">Hidden</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="details-section details-section--full">
          <h3 className="details-section__title">Base Stats</h3>
          <div className="details-stats">
            {stats.map(stat => (
              <div key={stat.label} className="details-stat-row">
                <span className="details-stat-label">{stat.label}</span>
                <span className="details-stat-value">{stat.value}</span>
                <div className="details-stat-bar">
                  <div
                    className="details-stat-bar-fill"
                    style={{
                      width: `${(stat.value / maxStat) * 100}%`,
                      backgroundColor: stat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {pokemon.moves.length > 0 && (
          <div className="details-section details-section--full">
            <h3 className="details-section__title">Moves (Top {pokemon.moves.length})</h3>
            <div className="details-chips">
              {pokemon.moves.map(move => (
                <span key={move} className="chip chip--move">
                  {move}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </GlassCard>
  );
}