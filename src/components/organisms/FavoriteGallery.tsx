"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { CharacterCard } from "@/components/molecules/CharacterCard";
import { getCharacter } from "@/lib/api";
import type { Character } from "@/types/rick-and-morty";

/** Cargo desde la API los personajes cuyos identificadores están guardados localmente. */
export function FavoriteGallery() {
  const { favoriteIds, ready } = useFavorites();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready) return;
    if (favoriteIds.length === 0) return;

    let active = true;
    const timer = window.setTimeout(() => {
      if (!active) return;
      setLoading(true);
      setError("");
      Promise.all(favoriteIds.map((id) => getCharacter(id).catch(() => null)))
        .then((results) => {
          if (active) setCharacters(results.filter((item): item is Character => item !== null));
        })
        .catch(() => {
          if (active) setError("No pude recuperar tu colección. Inténtalo de nuevo.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [favoriteIds, ready]);

  const visibleCharacters =
    favoriteIds.length === 0
      ? []
      : characters.filter((character) => favoriteIds.includes(character.id));

  if (!ready || loading) return <p className="feedback-state">Cargando tu colección...</p>;
  if (error) return <p className="feedback-state">{error}</p>;
  if (favoriteIds.length === 0) {
    return (
      <div className="empty-favorites">
        <FiHeart />
        <h2>Tu galería está esperando</h2>
        <p>Marca el corazón de cualquier personaje para guardarlo aquí.</p>
        <Link className="button button--primary" href="/personajes">
          Explorar personajes
        </Link>
      </div>
    );
  }

  return (
    <section className="content-section">
      <div className="character-grid">
        {visibleCharacters.map((character, index) => (
          <CharacterCard key={character.id} character={character} index={index} />
        ))}
      </div>
    </section>
  );
}