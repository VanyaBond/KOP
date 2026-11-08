export const ROUTES = {
  HOME: '/',
  POKEMON_DETAILS: '/pokemon/:id',
  POKEMON_DETAILS_BY_ID: (id: number | string) => `/pokemon/${id}`,
} as const;