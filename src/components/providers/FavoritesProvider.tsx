"use client";

import { createContext, useCallback, useContext, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  ready: boolean;
}

/** Creo el contexto que compartiré con las tarjetas de personajes. */
const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);
const FAVORITES_KEY = "rm-explorer-favorites";
const EMPTY_FAVORITES: number[] = [];
let cachedFavoritesRaw: string | null | undefined;
let cachedFavoritesSnapshot: number[] = EMPTY_FAVORITES;

/** Suscribo el componente a cambios de almacenamiento en el navegador. */
function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/** Leo y valido los identificadores favoritos guardados en el navegador. */
function readFavorites(): number[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (raw === cachedFavoritesRaw) return cachedFavoritesSnapshot;
    cachedFavoritesRaw = raw;
    if (!raw) {
      cachedFavoritesSnapshot = EMPTY_FAVORITES;
      return EMPTY_FAVORITES;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      cachedFavoritesSnapshot = EMPTY_FAVORITES;
      return EMPTY_FAVORITES;
    }
    cachedFavoritesSnapshot = parsed.filter(
      (id): id is number => Number.isInteger(id) && id > 0,
    );
    return cachedFavoritesSnapshot;
  } catch {
    try {
      window.localStorage.removeItem(FAVORITES_KEY);
    } catch {
      // Ignoro errores de acceso al almacenamiento.
    }
    cachedFavoritesRaw = null;
    cachedFavoritesSnapshot = EMPTY_FAVORITES;
    return EMPTY_FAVORITES;
  }
}

/** Devuelvo una lista vacía durante la renderización en servidor. */
function getServerFavorites(): number[] {
  return EMPTY_FAVORITES;
}

/** Persisto la colección de favoritos en el navegador. */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [, setVersion] = useState(0);
  const favoriteIds = useSyncExternalStore(subscribeStorage, readFavorites, getServerFavorites);
  const ready = useSyncExternalStore(
    subscribeStorage,
    () => true,
    () => false,
  );

  /** Compruebo si un personaje ya pertenece a la colección. */
  const isFavorite = useCallback((id: number) => favoriteIds.includes(id), [favoriteIds]);

  /** Agrego o retiro un personaje sin duplicar identificadores. */
  const toggleFavorite = useCallback((id: number) => {
    const current = readFavorites();
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    cachedFavoritesRaw = undefined;
    setVersion((value) => value + 1);
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite, ready }}>
      {children}
    </FavoritesContext.Provider>
  );
}

/** Facilito el acceso a favoritos desde tarjetas y vistas de detalle. */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites debe usarse dentro de FavoritesProvider.");
  return context;
}