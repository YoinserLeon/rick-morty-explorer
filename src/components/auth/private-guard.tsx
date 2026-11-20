"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

/** Protejo las pantallas privadas según la sesión local disponible en el navegador. */
export function PrivateGuard({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, user, router, pathname]);

  if (!ready || !user) {
    return <div className="page-shell page-shell--inner"><p className="eyebrow">VERIFICANDO ACCESO // C-137</p><p>Cargando tu estación...</p></div>;
  }
  return <>{children}</>;
}
