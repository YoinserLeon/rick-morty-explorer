import {
  characterSchema,
  charactersResponseSchema,
  episodesResponseSchema,
  locationsResponseSchema,
} from "@/lib/schemas";
import type { ZodType } from "zod";
import type {
  Character,
  CharacterFilters,
  CharacterResponse,
  Episode,
  EpisodeFilters,
  EpisodeResponse,
  LocationResponse,
} from "@/types/rick-and-morty";

const API_BASE_URL = process.env.NEXT_PUBLIC_RM_API_URL ?? "https://rickandmortyapi.com/api";

/** Creo un error tipado para distinguir fallos HTTP y de conexión. */
export class ApiError extends Error {
  /** Conservo el código HTTP recibido, si existe. */
  public readonly status: number | undefined;

  /** Construyo un error que puedo presentar de forma segura en la interfaz. */
  public constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Consulto un endpoint, verifico su respuesta HTTP y devuelvo JSON. */
async function requestJson<T>(url: string, parser: ZodType<T>): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { cache: "no-store" });
  } catch {
    throw new ApiError("No pude conectar con la dimensión de la API. Revisa tu conexión.");
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError("No encontré resultados para esa búsqueda.", 404);
    }
    throw new ApiError(`La API respondió con un error (${response.status}).`, response.status);
  }

  try {
    const payload: unknown = await response.json();
    return parser.parse(payload);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("La respuesta de la API no tiene el formato esperado.");
  }
}

/** Recupero personajes aplicando búsqueda, estado y paginación. */
export async function getCharacters(filters: CharacterFilters = {}): Promise<CharacterResponse> {
  const url = new URL(`${API_BASE_URL}/character`);
  if (filters.page) url.searchParams.set("page", String(filters.page));
  if (filters.name?.trim()) url.searchParams.set("name", filters.name.trim());
  if (filters.status) url.searchParams.set("status", filters.status);
  if (filters.species?.trim()) url.searchParams.set("species", filters.species.trim());
  if (filters.gender?.trim()) url.searchParams.set("gender", filters.gender.trim());
  return requestJson(url.toString(), charactersResponseSchema) as Promise<CharacterResponse>;
}

/** Recupero un personaje concreto y valido el objeto recibido. */
export async function getCharacter(id: number): Promise<Character> {
  const url = `${API_BASE_URL}/character/${id}`;
  return requestJson(url, characterSchema) as Promise<Character>;
}

/** Recupero episodios con los filtros de nombre, código y página. */
export async function getEpisodes(filters: EpisodeFilters = {}): Promise<EpisodeResponse> {
  const url = new URL(`${API_BASE_URL}/episode`);
  if (filters.page) url.searchParams.set("page", String(filters.page));
  if (filters.name?.trim()) url.searchParams.set("name", filters.name.trim());
  if (filters.episode?.trim()) url.searchParams.set("episode", filters.episode.trim());
  return requestJson(url.toString(), episodesResponseSchema) as Promise<EpisodeResponse>;
}

/** Recupero el catálogo de ubicaciones para la galería dimensional. */
export async function getLocations(page = 1): Promise<LocationResponse> {
  const url = new URL(`${API_BASE_URL}/location`);
  url.searchParams.set("page", String(page));
  return requestJson(url.toString(), locationsResponseSchema) as Promise<LocationResponse>;
}

/** Extraigo el identificador final de una URL de personaje de la API. */
export function getCharacterIdFromUrl(url: string): number {
  const segments = url.split("/").filter(Boolean);
  return Number(segments.at(-1) ?? 0);
}

/** Extraigo el episodio de temporada y capítulo desde el código de la API. */
export function getEpisodeLabel(code: string): string {
  const match = /^S(\d{2})E(\d{2})$/.exec(code);
  return match ? `Temporada ${Number(match[1])} · Episodio ${Number(match[2])}` : code;
}

/** Mantengo una referencia de tipo para que el catálogo compile con el modelo Episode. */
export type EpisodeModel = Episode;
