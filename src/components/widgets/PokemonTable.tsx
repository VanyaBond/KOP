import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SORT_FIELDS, TYPE_COLORS, SORT_DIRECTIONS, DEFAULT_SORT, ROUTES } from '@/consts';
import { FavoriteToggle } from '@/components/ui/FavoriteToggle';
import { useAppSelector } from '@/store/hooks';
import { selectFavoriteIds } from '@/store/selectors';
import type { PokemonSummary, SortField, SortConfig } from '@/types';
import { getCellValue } from '@/lib/get-cell-value';

interface PokemonTableProps {
  pokemons: readonly PokemonSummary[];
}

const compareValues = (a: string | number, b: string | number): number =>
  typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b));

const sortPokemon = (
  source: readonly PokemonSummary[],
  { field, direction }: SortConfig,
  favorites: readonly number[]
): PokemonSummary[] => {
  const copy = [...source];
  const sign = direction === SORT_DIRECTIONS.ASC ? 1 : -1;
  const favSet = new Set(favorites);

  copy.sort((a, b) => {
    const isFavA = favSet.has(a.id);
    const isFavB = favSet.has(b.id);

    if (isFavA && !isFavB) return -1;
    if (!isFavA && isFavB) return 1;

    const primary = compareValues(getCellValue(a, field), getCellValue(b, field)) * sign;
    if (primary !== 0) return primary;
    return a.name.localeCompare(b.name);
  });

  return copy;
};

interface SortIndicatorProps {
  field: SortField;
  current: SortConfig;
}

const SortIndicator = ({ field, current }: SortIndicatorProps) => {
  if (current.field !== field) {
    return <span className="sort-arrow sort-arrow--idle">⇅</span>;
  }
  return (
    <span className="sort-arrow">
      {current.direction === SORT_DIRECTIONS.ASC ? '▲' : '▼'}
    </span>
  );
};

export const PokemonTable = ({ pokemons }: PokemonTableProps) => {
  const [sort, setSort] = useState<SortConfig>(DEFAULT_SORT);
  const navigate = useNavigate();
  const favorites = useAppSelector(selectFavoriteIds);

  const toggle = (field: SortField) => {
    setSort(prev =>
      prev.field === field
        ? { field, direction: prev.direction === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC }
        : { field, direction: field === 'name' ? SORT_DIRECTIONS.ASC : SORT_DIRECTIONS.DESC }
    );
  };

  const sortedPokemons = useMemo(
    () => sortPokemon(pokemons, sort, favorites),
    [pokemons, sort, favorites]
  );

  const handleRowClick = (id: number) => {
    navigate(ROUTES.POKEMON_DETAILS_BY_ID(id));
  };

  if (pokemons.length === 0) {
    return (
      <div className="table-empty">
        <div className="table-empty__icon">🔍</div>
        <h3 className="table-empty__title">No Pokémon found</h3>
        <p className="table-empty__message">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="pokemon-table" aria-label="Pokémon Directory">
        <thead>
          <tr>
            <th scope="col" className="col-fav" aria-label="Favorite">★</th>
            <th scope="col" className="col-sprite">Sprite</th>
            {SORT_FIELDS.map(col => (
              <th
                key={col.id}
                scope="col"
                className={`col-${col.align}`}
                aria-sort={
                  sort.field === col.id
                    ? sort.direction === SORT_DIRECTIONS.ASC ? 'ascending' : 'descending'
                    : 'none'
                }
              >
                <button type="button" className="sort-btn" onClick={() => toggle(col.id)} aria-label={`Sort by ${col.label}`}>
                  <span>{col.label}</span>
                  <SortIndicator field={col.id} current={sort} />
                </button>
              </th>
            ))}
            <th scope="col" className="col-left">Types</th>
          </tr>
        </thead>
        <tbody>
          {sortedPokemons.map(pokemon => {
            const isFav = favorites.includes(pokemon.id);

            return (
              <tr
                key={pokemon.id}
                className={`pokemon-row ${isFav ? 'pokemon-row--favorite' : ''}`}
                onClick={() => handleRowClick(pokemon.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(pokemon.id);
                  }
                }}
              >
                <td className="col-fav" onClick={e => e.stopPropagation()}>
                  <FavoriteToggle pokemon={pokemon} id={pokemon.id} pokemonName={pokemon.name} />
                </td>
                <td className="col-sprite">
                  {pokemon.sprite ? (
                    <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" loading="lazy" />
                  ) : (
                    <span className="no-sprite" aria-hidden="true">?</span>
                  )}
                </td>
                <td className="col-right num">#{String(pokemon.id).padStart(3, '0')}</td>
                <td className="col-left">
                  <div className="cell-primary">
                    {pokemon.name}
                    {isFav ? <span className="fav-inline-badge">★ Favorite</span> : null}
                  </div>
                </td>
                <td className="col-right num">{pokemon.heightM} m</td>
                <td className="col-right num">{pokemon.weightKg} kg</td>
                <td className="col-right num">{pokemon.baseExperience}</td>
                <td className="col-right num">{pokemon.hp}</td>
                <td className="col-right num">{pokemon.speed}</td>
                <td className="col-left">
                  <div className="types-container">
                    {pokemon.types.map(type => (
                      <span key={type} className="type-badge" style={{ backgroundColor: TYPE_COLORS[type] || '#999' }}>
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="table-footer">
        Showing <strong>{sortedPokemons.length}</strong> of <strong>{pokemons.length}</strong> Pokémon · sorted by{' '}
        <strong>{sort.field}</strong> ({sort.direction === SORT_DIRECTIONS.ASC ? 'ascending' : 'descending'})
      </p>
    </div>
  );
};