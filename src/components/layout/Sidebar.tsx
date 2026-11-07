import { useState } from 'react';

const NAV_ITEMS = [{ id: 'overview', label: 'Overview', icon: '▦' }, { id: 'pokemon', label: 'Pokémon', icon: '🐾' }] as const;

export const Sidebar = () => {
  const [active, setActive] = useState<string>('overview');
  return (
    <aside className="sidebar">
      <div className="sidebar__logo" aria-hidden="true">🍥</div>
      <nav className="sidebar__nav">
        <p className="sidebar__caption">Navigation</p>
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button type="button" className={`sidebar__link ${active === item.id ? 'is-active' : ''}`} onClick={() => setActive(item.id)}>
                <span aria-hidden="true">{item.icon}</span>{item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar__footer">
        <p className="sidebar__caption">Data from</p>
        <p className="sidebar__note">
          <a className="sidebar__link" href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a> (Lab 1 Mock)
        </p>
      </div>
    </aside>
  );
};