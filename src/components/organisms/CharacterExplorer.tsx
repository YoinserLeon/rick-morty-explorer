"use client";

import { useEffect, useState } from "react";
import { CharacterCard } from "@/components/molecules/CharacterCard";
import { SearchField } from "@/components/molecules/SearchField";
import { Pagination } from "@/components/molecules/Pagination";
import { EmptyState, ErrorState, LoadingState } from "@/components/molecules/FeedbackState";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { getCharacters, ApiError } from "@/lib/api";
import type { Character } from "@/types/rick-and-morty";

type CharacterStatus = "all" | "Alive" | "Dead" | "unknown";

/** Consulto la API y presento el catálogo de personajes con filtros dinámicos. */
export function CharacterExplorer({
  initialName = "",
  featured = false,
}: {
  initialName?: string;
  featured?: boolean;
}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [query, setQuery] = useState(initialName);
  const [prevInitialName, setPrevInitialName] = useState(initialName);
  const [status, setStatus] = useState<CharacterStatus>("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (initialName !== prevInitialName) {
    setPrevInitialName(initialName);
    setQuery(initialName);
  }

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      try {
        const response = await getCharacters({
          page,
          name: query.trim() || undefined,
          status: status === "all" ? undefined : status,
        });
        if (!active) return;
        setCharacters(featured ? response.results.slice(0, 6) : response.results);
        setPages(response.info.pages);
        setError("");
      } catch (requestError) {
        if (!active) return;
        if (requestError instanceof ApiError && requestError.status === 404) {
          setCharacters([]);
          setPages(1);
          setError("");
        } else {
          setError(requestError instanceof Error ? requestError.message : "No pude cargar los personajes.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }, query ? 280 : 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [featured, page, query, status]);

  /** Actualizo el texto y regreso al primer bloque de resultados. */
  function handleQueryChange(value: string) {
    setLoading(true);
    setQuery(value);
    setPage(1);
  }

  /** Aplico el filtro de estado desde los controles del catálogo. */
  function handleStatusChange(value: CharacterStatus) {
    setLoading(true);
    setStatus(value);
    setPage(1);
  }

  /** Cambio la página activa tras marcar el estado de carga. */
  function handlePageChange(nextPage: number) {
    setLoading(true);
    setPage(nextPage);
  }

  return (
    <section className="content-section" id="characters">
      <SectionTitle
        eyebrow={featured ? "ARCHIVO MULTIVERSAL" : "BASE DE DATOS // C-137"}
        title={featured ? "Personajes principales" : "Explora los personajes"}
        description={featured ? "Algunos habitantes conocidos de nuestra dimensión." : "Busca, filtra y guarda a tus personajes favoritos."}
      />
      {!featured ? (
        <div className="explorer-toolbar">
          <SearchField value={query} onChange={handleQueryChange} placeholder="Buscar por nombre..." />
          <div className="filter-group" aria-label="Filtrar por estado">
            {(["all", "Alive", "Dead", "unknown"] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={status === value ? "filter-chip is-active" : "filter-chip"}
                onClick={() => handleStatusChange(value)}
              >
                {value === "all" ? "Todos" : value === "Alive" ? "Vivos" : value === "Dead" ? "Fallecidos" : "Desconocidos"}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {loading ? <LoadingState label="Buscando formas de vida..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error && characters.length === 0 ? <EmptyState message="No encontré personajes con esos filtros." /> : null}
      {!loading && !error && characters.length > 0 ? (
        <div className="character-grid">
          {characters.map((character, index) => <CharacterCard key={character.id} character={character} index={index} />)}
        </div>
      ) : null}
      {!featured && !loading && !error ? <Pagination page={page} pages={pages} onChange={handlePageChange} /> : null}
    </section>
  );
}