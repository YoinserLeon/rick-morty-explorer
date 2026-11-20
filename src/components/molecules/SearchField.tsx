import { FiSearch, FiX } from "react-icons/fi";

/** Renderizo un campo de búsqueda reutilizable con acción para limpiar. */
export function SearchField({
  value,
  onChange,
  placeholder = "Buscar en el multiverso...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="search-field">
      <FiSearch aria-hidden="true" />
      <span className="sr-only">Buscar</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {value ? (
        <button type="button" aria-label="Limpiar búsqueda" onClick={() => onChange("")}>
          <FiX aria-hidden="true" />
        </button>
      ) : null}
    </label>
  );
}
