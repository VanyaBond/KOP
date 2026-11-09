import type { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { selectFavoriteEntities, selectFavoriteIds, selectPokemonItems } from '@/store/selectors';
import type { FavoriteToggleProps } from '@/types';

export const FavoriteToggle = ({ pokemon, id, pokemonName, className = '' }: FavoriteToggleProps) => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector(selectFavoriteIds);
  const entities = useAppSelector(selectFavoriteEntities);
  const items = useAppSelector(selectPokemonItems);

  const isFav = ids.includes(id);

  const handleToggle = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const target = pokemon ?? entities[id] ?? items.find(p => p.id === id);
    dispatch(toggleFavorite(target ?? id));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`fav-btn ${isFav ? 'fav-btn--active' : ''} ${className}`}
      aria-label={isFav ? `Remove ${pokemonName ?? id} from favorites` : `Add ${pokemonName ?? id} to favorites`}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span aria-hidden="true">{isFav ? '★' : '☆'}</span>
    </button>
  );
};