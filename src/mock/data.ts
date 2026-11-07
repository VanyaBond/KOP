import type { PokemonDto, PokemonSummary, KpiData } from '@/types/dashboard';

export const MOCK_POKEMON_DTOS: PokemonDto[] = [
  {
    id: 25, name: 'pikachu', height: 4, weight: 60, base_experience: 112,
    types: [{ slot: 1, type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' } }],
    stats: [
      { base_stat: 35, stat: { name: 'hp', url: '' } },
      { base_stat: 55, stat: { name: 'attack', url: '' } },
      { base_stat: 40, stat: { name: 'defense', url: '' } },
      { base_stat: 90, stat: { name: 'speed', url: '' } },
    ],
  },
  {
    id: 35, name: 'clefairy', height: 6, weight: 75, base_experience: 113,
    types: [{ slot: 1, type: { name: 'fairy', url: 'https://pokeapi.co/api/v2/type/18/' } }],
    stats: [
      { base_stat: 70, stat: { name: 'hp', url: '' } },
      { base_stat: 45, stat: { name: 'attack', url: '' } },
      { base_stat: 48, stat: { name: 'defense', url: '' } },
      { base_stat: 35, stat: { name: 'speed', url: '' } },
    ],
  },
  {
    id: 4, name: 'charmander', height: 6, weight: 85, base_experience: 62,
    types: [{ slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } }],
    stats: [
      { base_stat: 39, stat: { name: 'hp', url: '' } },
      { base_stat: 52, stat: { name: 'attack', url: '' } },
      { base_stat: 43, stat: { name: 'defense', url: '' } },
      { base_stat: 65, stat: { name: 'speed', url: '' } },
    ],
  },
  {
    id: 7, name: 'squirtle', height: 5, weight: 90, base_experience: 63,
    types: [{ slot: 1, type: { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' } }],
    stats: [
      { base_stat: 44, stat: { name: 'hp', url: '' } },
      { base_stat: 48, stat: { name: 'attack', url: '' } },
      { base_stat: 65, stat: { name: 'defense', url: '' } },
      { base_stat: 43, stat: { name: 'speed', url: '' } },
    ],
  },
  {
    id: 1, name: 'bulbasaur', height: 7, weight: 69, base_experience: 64,
    types: [{ slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } }, { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }],
    stats: [
      { base_stat: 45, stat: { name: 'hp', url: '' } },
      { base_stat: 49, stat: { name: 'attack', url: '' } },
      { base_stat: 49, stat: { name: 'defense', url: '' } },
      { base_stat: 45, stat: { name: 'speed', url: '' } },
    ],
  },
  {
    id: 6, name: 'charizard', height: 17, weight: 905, base_experience: 267,
    types: [{ slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } }, { slot: 2, type: { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' } }],
    stats: [
      { base_stat: 78, stat: { name: 'hp', url: '' } },
      { base_stat: 84, stat: { name: 'attack', url: '' } },
      { base_stat: 78, stat: { name: 'defense', url: '' } },
      { base_stat: 100, stat: { name: 'speed', url: '' } },
    ],
  },
];

export const mapPokemonSummary = (dto: PokemonDto): PokemonSummary => ({
  id: dto.id,
  name: dto.name.charAt(0).toUpperCase() + dto.name.slice(1),
  types: dto.types.map(t => t.type.name),
  baseExperience: dto.base_experience,
  weightKg: dto.weight / 10,
  heightM: dto.height / 10,
  hp: dto.stats.find(s => s.stat.name === 'hp')?.base_stat ?? 0,
  speed: dto.stats.find(s => s.stat.name === 'speed')?.base_stat ?? 0,
});

export const buildKpis = (pokemons: readonly PokemonSummary[]): KpiData[] => {
  const totalBaseExp = pokemons.reduce((sum, p) => sum + p.baseExperience, 0);
  const avgWeight = pokemons.length > 0 ? pokemons.reduce((sum, p) => sum + p.weightKg, 0) / pokemons.length : 0;
  const totalHP = pokemons.reduce((sum, p) => sum + p.hp, 0);

  return [
    {
      id: 'tracked', title: '⚡ Pokémon Ready', value: String(pokemons.length),
      deltaPercent: 12.5, deltaAbsolute: '+2 fighters', hint: 'Battle-ready Pokémon',
    },
    {
      id: 'total_hp', title: '💪 Total HP', value: String(totalHP),
      deltaPercent: 8.3, deltaAbsolute: '+45 HP', hint: 'Combined team HP',
    },
    {
      id: 'avg_weight', title: '⚖️ Avg Weight', value: `${avgWeight.toFixed(1)} kg`,
      deltaPercent: -2.1, deltaAbsolute: '-0.5 kg', hint: 'Average fighter weight',
    },
    {
      id: 'total_exp', title: '⭐ Total EXP', value: String(totalBaseExp),
      deltaPercent: 15.4, deltaAbsolute: '+89 EXP', hint: 'Combined battle experience',
    },
  ];
};