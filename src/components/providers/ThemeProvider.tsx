"use client";

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

type Theme = "dark" | "light";
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  ready: boolean;
}

/** Creo el contexto que compartiré con los controles de tema. */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_KEY = "rm-explorer-theme";

/** Suscribo el componente a cambios de almacenamiento en el navegador. */
function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/** Leo el tema guardado en el almacenamiento local o uso el oscuro por defecto. */
function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : "dark";
  } catch {
    return "dark";
  }
}

/** Devuelvo el tema oscuro durante la renderización en servidor. */
function getServerTheme(): Theme {
  return "dark";
}

/** Mantengo el tema elegido y sincronizo la clase dark del elemento html. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [, setVersion] = useState(0);
  const theme = useSyncExternalStore(subscribeStorage, readTheme, getServerTheme);
  const ready = useSyncExternalStore(
    subscribeStorage,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [ready, theme]);

  /** Alterno entre el tema espacial oscuro y el tema claro. */
  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = readTheme() === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_KEY, nextTheme);
    setVersion((current) => current + 1);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme, ready }}>{children}</ThemeContext.Provider>;
}

/** Expongo el tema sin que los componentes deban conocer el almacenamiento. */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider.");
  return context;
}