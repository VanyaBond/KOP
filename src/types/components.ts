import type { PokemonSummary } from './pokemon';

export interface FavoriteToggleProps {
  pokemon?: PokemonSummary;
  id: number;
  pokemonName?: string;
  className?: string;
}