"use client";

import Link from "next/link";
import { FiHeart, FiSettings, FiUsers } from "react-icons/fi";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFavorites } from "@/components/providers/FavoritesProvider";

/** Presento un resumen sencillo de la cuenta y accesos a la colección. */
export default function DashboardPage() {
  const { user } = useAuth();
  const { favoriteIds } = useFavorites();
  return (
    <div className="page-shell page-shell--inner">
      <header className="page-intro">
        <p className="eyebrow"><span className="eyebrow__dot" /> ESTACIÓN PERSONAL // C-137</p>
        <h1>Hola, <span>{user?.name ?? "viajero"}</span></h1>
        <p>Tu espacio para guardar personajes y seguir explorando el multiverso.</p>
      </header>
      <div className="discovery-strip">
        <div className="discovery-strip__item"><span><FiHeart /></span><div><strong>{favoriteIds.length} favoritos</strong><p>Personajes que guardaste.</p></div><Link href="/galeria" aria-label="Abrir galería">→</Link></div>
        <div className="discovery-strip__item"><span><FiUsers /></span><div><strong>Explorar personajes</strong><p>Encuentra nuevos habitantes.</p></div><Link href="/personajes" aria-label="Ver personajes">→</Link></div>
        <div className="discovery-strip__item"><span><FiSettings /></span><div><strong>Configuración</strong><p>Gestiona tu cuenta local.</p></div><Link href="/configuracion" aria-label="Configuración">→</Link></div>
      </div>
    </div>
  );
}
