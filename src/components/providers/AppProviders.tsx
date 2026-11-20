"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

/** Compongo los contextos globales que utiliza toda la aplicación. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AuthProvider>{children}</AuthProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
