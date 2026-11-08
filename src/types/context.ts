import type { Theme, PokemonSummary } from './pokemon';

export interface ThemeCtx {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

export interface PokemonCtx {
  pokemons: PokemonSummary[];
  loading: boolean;
  error: string | null;
  debouncing: boolean;
  retry: () => void;
  findById: (id: number) => PokemonSummary | undefined;
}