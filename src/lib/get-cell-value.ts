import { PokemonSummary } from "@/types/pokemon";
import { SortField } from "@/types/pokemon";

const FIELD_GETTERS: Record<SortField, (p: PokemonSummary) => string | number> = {
  name: (p) => p.name,
  id: (p) => p.id,
  height: (p) => p.heightM,
  weight: (p) => p.weightKg,
  baseExperience: (p) => p.baseExperience,
  hp: (p) => p.hp,
  speed: (p) => p.speed,
};


export const getCellValue = (pokemon: PokemonSummary, field: SortField): string | number => {
  return FIELD_GETTERS[field](pokemon);
};