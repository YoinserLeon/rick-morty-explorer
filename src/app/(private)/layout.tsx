import type { ReactNode } from "react";
import { PrivateGuard } from "@/components/auth/private-guard";

/** Mantengo todas las rutas privadas detrás de la misma comprobación de sesión. */
export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <PrivateGuard>{children}</PrivateGuard>;
}
