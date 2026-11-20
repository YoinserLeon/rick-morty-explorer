import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import "./globals.css";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Defino metadatos generales y una URL base configurable para producción. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rick & Morty Explorer | Explora el multiverso",
    template: "%s | Rick & Morty Explorer",
  },
  description: "Explora personajes y guarda tus favoritos en tu propia galería del multiverso.",
  applicationName: "Rick & Morty Explorer",
  keywords: ["Rick and Morty", "personajes", "galería", "multiverso", "explorer"],
};

/** Establezco el viewport adaptable para escritorio, tablet y móvil. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050a14",
};

/** Compongo el layout raíz con proveedores, navegación y pie global. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${pixelFont.variable} ${monoFont.variable}`}>
        <AppProviders>
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
