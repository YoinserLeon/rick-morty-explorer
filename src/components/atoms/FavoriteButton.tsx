"use client";

import { FiHeart } from "react-icons/fi";
import { useFavorites } from "@/components/providers/FavoritesProvider";

/** Permito guardar o retirar un personaje de la colección personal. */
export function FavoriteButton({ characterId }: { characterId: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(characterId);
  return (
    <button
      type="button"
      className={`favorite-button${active ? " is-active" : ""}`}
      onClick={() => toggleFavorite(characterId)}
      aria-label={active ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-pressed={active}
      title={active ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <FiHeart aria-hidden="true" />
    </button>
  );
}
