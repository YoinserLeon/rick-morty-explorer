import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Character } from "@/types/rick-and-morty";
import { formatSpecies } from "@/lib/utils";
import { FavoriteButton } from "@/components/atoms/FavoriteButton";
import { StatusBadge } from "@/components/atoms/StatusBadge";

const accents = ["green", "yellow", "pink", "cyan", "purple"];

/** Construyo una tarjeta de personaje con imagen, estado y acceso al detalle. */
export function CharacterCard({ character, index = 0 }: { character: Character; index?: number }) {
  const accent = accents[index % accents.length];
  return (
    <article className={`character-card character-card--${accent}`}>
      <div className="character-card__image-wrap">
        <Image
          src={character.image}
          alt={`Retrato de ${character.name}`}
          width={320}
          height={320}
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 220px"
          className="character-card__image"
        />
        <FavoriteButton characterId={character.id} />
      </div>
      <div className="character-card__body">
        <div className="character-card__heading">
          <h3 title={character.name}>{character.name}</h3>
          <StatusBadge status={character.status} />
        </div>
        <p className="character-card__meta">
          {formatSpecies(character.species)} <span>·</span> {character.gender}
        </p>
        <div className="character-card__progress" aria-hidden="true"><span /></div>
        <Link className="character-card__link" href={`/personajes/${character.id}`}>
          Ver expediente <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
