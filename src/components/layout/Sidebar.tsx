import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'pokemon', label: 'Pokémon', icon: '🐾' }
] as const;

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const [active, setActive] = useState<string>('overview');

  return (
    <aside className={`sidebar ${!isOpen ? 'sidebar--closed' : ''}`}>
      <div className="sidebar__logo" aria-hidden="true">🍥</div>
      
      <nav className="sidebar__nav">
        <p className="sidebar__caption">Navigation</p>
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                type="button"
                className={`sidebar__link ${active === item.id ? 'is-active' : ''}`}
                onClick={() => setActive(item.id)}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <p className="sidebar__caption">Data from</p>
        <p className="sidebar__note">
          <a 
            className="sidebar__link" 
            href="https://pokeapi.co/" 
            target="_blank" 
            rel="noreferrer"
          >
            PokéAPI
          </a>
        </p>
      </div>
    </aside>
  );
};