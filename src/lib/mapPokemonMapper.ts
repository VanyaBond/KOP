import type { PokemonDto, PokemonSummary } from '@/types/pokemon';

export const mapPokemonSummary = (dto: PokemonDto): PokemonSummary => {
  const hp = dto.stats.find(s => s.stat.name === 'hp')?.base_stat ?? 0;
  const attack = dto.stats.find(s => s.stat.name === 'attack')?.base_stat ?? 0;
  const defense = dto.stats.find(s => s.stat.name === 'defense')?.base_stat ?? 0;
  const speed = dto.stats.find(s => s.stat.name === 'speed')?.base_stat ?? 0;
  
  return {
    id: dto.id,
    name: dto.name.charAt(0).toUpperCase() + dto.name.slice(1),
    heightM: dto.height / 10,
    weightKg: dto.weight / 10,
    baseExperience: dto.base_experience,
    types: dto.types.map(t => t.type.name),
    abilities: dto.abilities.map(a => a.ability.name.replace('-', ' ')),
    hp,
    attack,
    defense,
    speed,
    totalStats: hp + attack + defense + 
      (dto.stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? 0) +
      (dto.stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? 0) +
      speed,
    sprite: dto.sprites.front_default,
  };
};