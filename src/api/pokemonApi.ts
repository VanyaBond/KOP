import { API_BASE_URL, POKEMON_LIMIT } from '@/consts/pokemonConsts';
import type { PokemonDto } from '@/types/pokemon';

export async function fetchPokemonList(limit: number = POKEMON_LIMIT, signal?: AbortSignal): Promise<PokemonDto[]> {
  const url = `${API_BASE_URL}/pokemon?limit=${limit}`;
  
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    throw new Error(`PokéAPI ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  const detailsPromises = data.results.map((pokemon: { url: string }) => 
    fetch(pokemon.url, { signal }).then(res => res.json())
  );
  
  return await Promise.all(detailsPromises);
}

export async function fetchPokemonById(id: number, signal?: AbortSignal): Promise<PokemonDto> {
  const url = `${API_BASE_URL}/pokemon/${id}`;
  
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    throw new Error(`PokéAPI ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
}