import type { Metadata } from "next";
import { CharacterExplorer } from "@/components/organisms/CharacterExplorer";

export const metadata: Metadata = { title: "Personajes" };

/** Muestro el catálogo completo y leo la búsqueda inicial desde la URL. */
export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="page-shell page-shell--inner">
      <header className="page-intro">
        <p className="eyebrow"><span className="eyebrow__dot" /> REGISTRO DE FORMAS DE VIDA</p>
        <h1>Base de datos <span>multiversal</span></h1>
        <p>Consulta los expedientes de las criaturas y viajeros registrados por la API.</p>
      </header>
      <CharacterExplorer key={params.name ?? "all"} initialName={params.name ?? ""} />
    </div>
  );
}
