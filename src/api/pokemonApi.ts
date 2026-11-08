import { API_BASE_URL } from '@/consts/pokemonConsts';
import type { PokemonDto, PokemonFilters } from '@/types/pokemon';

export async function fetchPokemonList(
  filters: PokemonFilters,
  signal?: AbortSignal
): Promise<PokemonDto[]> {
  const { query, type, minHp, limit } = filters;
  
  const url = `${API_BASE_URL}/pokemon?limit=${limit}`;
  
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    throw new Error(`PokéAPI ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  const detailsPromises = data.results.map((pokemon: { url: string }) => 
    fetch(pokemon.url, { signal }).then(res => res.json())
  );
  
  const allPokemons = await Promise.all(detailsPromises);
  //clien filtering because api not support it (
  return allPokemons.filter((p: PokemonDto) => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    if (type !== 'all' && !p.types.some(t => t.type.name === type)) {
      return false;
    }

    if (minHp > 0) {
      const hpStat = p.stats.find(s => s.stat.name === 'hp');
      if (!hpStat || hpStat.base_stat < minHp) {
        return false;
      }
    }

    return true;
  });
}

export async function fetchPokemonById(id: number, signal?: AbortSignal): Promise<PokemonDto> {
  const url = `${API_BASE_URL}/pokemon/${id}`;
  
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    throw new Error(`PokéAPI ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
}