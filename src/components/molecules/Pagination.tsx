import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/** Ofrezco controles de paginación accesibles para catálogos remotos. */
export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Paginación">
      <button type="button" onClick={() => onChange(Math.max(1, page - 1))} disabled={page <= 1}>
        <FiChevronLeft aria-hidden="true" /> Anterior
      </button>
      <span>Página <strong>{page}</strong> de <strong>{pages}</strong></span>
      <button type="button" onClick={() => onChange(Math.min(pages, page + 1))} disabled={page >= pages}>
        Siguiente <FiChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}
