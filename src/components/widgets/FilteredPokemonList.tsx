import { useMemo, useState } from 'react';
import { formatCompact } from '@/lib/format';
import { TYPE_COLORS } from '@/consts/pokemonConsts';
import type { PokemonSummary } from '@/types/pokemon';

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
    return [ALL_TYPES, ...Array.from(allTypes).sort()];
  }, [items]);

  const visible = useMemo(() => {
    if (type === ALL_TYPES) return items;
    return items.filter(item => item.types.includes(type.toLowerCase()));
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
              <small style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {pokemon.types.map(t => (
                  <span 
                    key={t} 
                    className="type-badge"
                    style={{ 
                      backgroundColor: TYPE_COLORS[t] || '#999',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {t}
                  </span>
                ))}
                <span style={{ color: '#666', fontSize: '12px' }}>
                  · {pokemon.heightM}m · {pokemon.weightKg}kg
                </span>
              </small>
            </span>
            <span className="filtered-list__value" style={{ fontWeight: 700, color: '#333' }}>
              HP: {formatCompact(pokemon.hp)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};