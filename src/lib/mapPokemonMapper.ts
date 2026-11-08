import type { PokemonDto, PokemonSummary, PokemonDetailSummary } from '@/types';

export function mapPokemonSummary(dto: PokemonDto): PokemonSummary {
  const getStat = (name: string) => 
    dto.stats.find(s => s.stat.name === name)?.base_stat || 0;

  const hp = getStat('hp');
  const attack = getStat('attack');
  const defense = getStat('defense');
  const specialAttack = getStat('special-attack');
  const specialDefense = getStat('special-defense');
  const speed = getStat('speed');

  return {
    id: dto.id,
    name: dto.name.charAt(0).toUpperCase() + dto.name.slice(1),
    heightM: dto.height / 10,
    weightKg: dto.weight / 10,
    baseExperience: dto.base_experience,
    types: dto.types.map(t => t.type.name),
    abilities: dto.abilities.map(a => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    totalStats: hp + attack + defense + specialAttack + specialDefense + speed,
    sprite: dto.sprites.front_default,
    spriteBack: dto.sprites.back_default || null,
    artwork: dto.sprites.other?.['official-artwork']?.front_default || null,
  };
}

export function mapPokemonDetailSummary(dto: PokemonDto): PokemonDetailSummary {
  const base = mapPokemonSummary(dto);
  
  return {
    ...base,
    moves: dto.moves.slice(0, 20).map(m => m.move.name),
    speciesName: dto.species.name,
  };
}