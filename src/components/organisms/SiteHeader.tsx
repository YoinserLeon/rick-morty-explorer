"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import { PixelLogo } from "@/components/atoms/PixelLogo";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { useAuth } from "@/components/providers/AuthProvider";

/** Muestro solo las secciones que forman parte de la experiencia actual. */
export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, ready } = useAuth();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = [
    { label: "Inicio", href: "/" },
    { label: "Personajes", href: "/personajes" },
    ...(user ? [{ label: "Galería", href: "/galeria" }] : []),
  ];

  /** Llevo la búsqueda al catálogo sin recargar toda la aplicación. */
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/personajes?name=${encodeURIComponent(value)}` : "/personajes");
    setMenuOpen(false);
  }

  /** Cierro la sesión local y vuelvo a la portada. */
  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <PixelLogo />
        <button type="button" className="icon-button site-header__menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={`site-nav${menuOpen ? " site-nav--open" : ""}`} aria-label="Navegación principal">
          {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={pathname === item.href ? "is-active" : ""}>{item.label}</Link>)}
        </nav>
        <form className="header-search" onSubmit={handleSearch} role="search">
          <FiSearch aria-hidden="true" />
          <label className="sr-only" htmlFor="global-search">Buscar personajes</label>
          <input id="global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar personajes..." />
        </form>
        <div className="site-header__actions">
          <ThemeToggle />
          {ready && user ? (
            <div className="header-user">
              <Link href="/dashboard" className="header-user__name"><FiUser aria-hidden="true" /> <span>{user.name}</span></Link>
              <button type="button" className="icon-button" onClick={handleLogout} aria-label="Cerrar sesión" title="Cerrar sesión"><FiLogOut /></button>
            </div>
          ) : <Link href="/login" className="icon-button" aria-label="Iniciar sesión"><FiUser aria-hidden="true" /></Link>}
        </div>
      </div>
    </header>
  );
}
