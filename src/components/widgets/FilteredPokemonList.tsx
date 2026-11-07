import { useMemo, useState } from 'react';
import type { PokemonSummary } from '@/types/dashboard';
import { capitalize } from '@/lib/format';

const ALL_TYPES = 'All Types';

interface FilteredPokemonListProps {
  items: PokemonSummary[];
  title?: string;
  colorScheme?: 'yellow' | 'blue';
}

export const FilteredPokemonList = ({ items, title = 'Pokémon List', colorScheme = 'yellow' }: FilteredPokemonListProps) => {
  const [type, setType] = useState(ALL_TYPES);

  const types = useMemo(() => {
    const allTypes = new Set<string>();
    items.forEach(item => item.types.forEach(t => allTypes.add(t)));
    return [ALL_TYPES, ...Array.from(allTypes).map(capitalize)];
  }, [items]);

  const visible = useMemo(() => {
    if (type === ALL_TYPES) return items;
    return items.filter(item => item.types.map(t => capitalize(t)).includes(type));
  }, [items, type]);

  const bgColor = colorScheme === 'blue' 
    ? 'linear-gradient(135deg, #E0F7FF 0%, #B3E0FF 100%)'
    : 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)';

  return (
    <div className="filtered-list" style={{ background: bgColor }}>
      <label className="filtered-list__label" htmlFor="type-filter">{title}</label>
      <select 
        id="type-filter" 
        className="filtered-list__select" 
        value={type} 
        onChange={e => setType(e.target.value)}
      >
        {types.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <p className="filtered-list__meta">
        Showing {visible.length} of {items.length} Pokémon
      </p>
      <ul className="filtered-list__items">
        {visible.map(pokemon => (
          <li key={pokemon.id} className="filtered-list__row">
            <span className="filtered-list__name">
              {pokemon.name}
              <small>
                {pokemon.types.map(capitalize).join(', ')} · {pokemon.heightM}m · {pokemon.weightKg}kg
              </small>
            </span>
            <span className="filtered-list__value">HP: {pokemon.hp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};