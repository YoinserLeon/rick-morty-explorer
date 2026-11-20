import { FiAlertTriangle, FiLoader, FiSearch } from "react-icons/fi";

/** Represento un estado de carga mientras consulto los datos remotos. */
export function LoadingState({ label = "Conectando con la dimensión..." }: { label?: string }) {
  return (
    <div className="feedback-state" role="status">
      <FiLoader className="feedback-state__spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

/** Informo de errores sin ocultar el área de trabajo. */
export function ErrorState({ message }: { message: string }) {
  return (
    <div className="feedback-state feedback-state--error" role="alert">
      <FiAlertTriangle aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

/** Comunico al usuario que una búsqueda no devolvió resultados. */
export function EmptyState({ message = "No encontré resultados en esta dimensión." }: { message?: string }) {
  return (
    <div className="feedback-state">
      <FiSearch aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
