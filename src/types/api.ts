import { Key, ReactNode } from 'react';

export interface CountryDto {
  code: Key | null | undefined;
  flagEmoji: ReactNode;
  name: ReactNode;
  names: { common: string; official: string };
  codes: { alpha_2: string; alpha_3: string };
  flag: { emoji: string; url_png: string };
  region: string;
  subregion: string;
  capitals: { name: string }[];
  population: number;
  area: { kilometers: number; miles: number };
  currencies: { code: string; name: string }[];
  languages: { name: string }[];
  classification: { un_member: boolean };
  landlocked: boolean;
  timezones: string[];
}
