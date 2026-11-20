/** Indico el modelo de autenticación activo en esta versión sin backend. */
export const AUTH_STORAGE_MODE = "browser-local-storage" as const;

/** Identifico las rutas privadas para mantener el criterio compartido con el proxy. */
export function isPrivatePath(pathname: string): boolean {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/") ||
    pathname === "/configuracion" || pathname.startsWith("/configuracion/") ||
    pathname === "/galeria" || pathname.startsWith("/galeria/");
}
