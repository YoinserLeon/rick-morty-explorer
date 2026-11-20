/** Describo la información de origen y ubicación de un personaje. */
export interface ApiReference {
  name: string;
  url: string;
}

/** Modelo los datos públicos que devuelve la API para cada personaje. */
export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: ApiReference;
  location: ApiReference;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/** Modelo el resumen de paginación que entrega la API. */
export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

/** Modelo una respuesta paginada de personajes. */
export interface CharacterResponse {
  info: ApiInfo;
  results: Character[];
}

/** Modelo un episodio del catálogo oficial. */
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

/** Modelo una respuesta paginada de episodios. */
export interface EpisodeResponse {
  info: ApiInfo;
  results: Episode[];
}

/** Modelo una ubicación del universo de la serie. */
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

/** Modelo una respuesta paginada de ubicaciones. */
export interface LocationResponse {
  info: ApiInfo;
  results: Location[];
}

/** Agrupo los filtros disponibles para consultar personajes. */
export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: "Alive" | "Dead" | "unknown";
  species?: string;
  gender?: string;
}

/** Indico los parámetros admitidos por el catálogo de episodios. */
export interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string;
}
