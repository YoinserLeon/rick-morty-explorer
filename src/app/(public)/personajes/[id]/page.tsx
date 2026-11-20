import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiMapPin, FiUser } from "react-icons/fi";
import { getCharacter, ApiError } from "@/lib/api";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import { FavoriteButton } from "@/components/atoms/FavoriteButton";

/**
 * Genero el título y la descripción dinámicos del expediente del personaje para SEO y Open Graph.
 *
 * @param {Object} props - Propiedades de ruta recibidas por el componente.
 * @param {Promise<{ id: string }>} props.params - Parámetros dinámicos de la ruta con el ID del personaje.
 * @returns {Promise<Metadata>} Metadatos generados para la página del personaje.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const character = await getCharacter(Number(id));
    return {
      title: character.name,
      description: `Expediente de ${character.name}.`,
      openGraph: {
        title: character.name,
        description: `Expediente de ${character.name}.`,
        images: [{ url: character.image, alt: `Retrato de ${character.name}` }],
      },
      twitter: {
        card: "summary_large_image",
        title: character.name,
        description: `Expediente de ${character.name}.`,
        images: [character.image],
      },
    };
  } catch {
    return { title: "Personaje no encontrado" };
  }
}

/**
 * Presento la ficha extendida de un personaje consultado por identificador.
 *
 * @param {Object} props - Propiedades de ruta recibidas por la página.
 * @param {Promise<{ id: string }>} props.params - Parámetros dinámicos de la ruta con el ID del personaje.
 * @returns {Promise<JSX.Element>} Vista detallada del personaje.
 */
export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) notFound();

  let character;

  try {
    character = await getCharacter(numericId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  if (!character) {
    notFound();
  }

  return (
    <div className="page-shell page-shell--inner">
      <Link href="/personajes" className="back-link">
        <FiArrowLeft aria-hidden="true" /> Volver al catálogo
      </Link>
      <article className="character-detail">
        <div className="character-detail__portrait">
          <Image
            src={character.image}
            alt={`Retrato de ${character.name}`}
            width={520}
            height={520}
            priority
          />
          <FavoriteButton characterId={character.id} />
        </div>
        <div className="character-detail__content">
          <p className="eyebrow">
            EXPEDIENTE // SUJETO {String(character.id).padStart(4, "0")}
          </p>
          <h1>{character.name}</h1>
          <StatusBadge status={character.status} />
          <p className="character-detail__summary">
            Los registros de esta dimensión identifican al sujeto con los siguientes datos.
          </p>
          <dl className="character-facts">
            <div>
              <dt>
                <FiUser /> Especie
              </dt>
              <dd>{character.species}</dd>
            </div>
            <div>
              <dt>Género</dt>
              <dd>{character.gender}</dd>
            </div>
            <div>
              <dt>Tipo</dt>
              <dd>{character.type || "Sin clasificar"}</dd>
            </div>
            <div>
              <dt>
                <FiMapPin /> Origen
              </dt>
              <dd>{character.origin.name}</dd>
            </div>
            <div>
              <dt>
                <FiMapPin /> Ubicación actual
              </dt>
              <dd>{character.location.name}</dd>
            </div>
            <div>
              <dt>Episodios registrados</dt>
              <dd>{character.episode.length}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  );
}