/** Traduzco los estados de la API a etiquetas breves en español. */
export function translateStatus(status: string): string {
  const labels: Record<string, string> = {
    Alive: "Vivo",
    Dead: "Fallecido",
    unknown: "Desconocido",
  };
  return labels[status] ?? status;
}

/** Convierto los nombres de especies en una etiqueta visual compacta. */
export function formatSpecies(species: string): string {
  return species.trim() || "Especie sin clasificar";
}

/** Normalizo el correo antes de guardarlo o compararlo localmente. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Formateo fechas simples sin añadir dependencias externas. */
export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}
