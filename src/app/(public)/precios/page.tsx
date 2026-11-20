import type { Metadata } from "next";

export const metadata: Metadata = { title: "Precios" };

/** Explico que la experiencia de exploración no requiere una suscripción. */
export default function PricingPage() {
  return <div className="page-shell page-shell--inner"><header className="page-intro"><p className="eyebrow"><span className="eyebrow__dot" /> ACCESO AL MULTIVERSO</p><h1>Sin tarifas. <span>Solo aventuras.</span></h1><p>Rick & Morty Explorer es un proyecto personal y gratuito. No necesitas una suscripción para explorar personajes y dimensiones.</p></header></div>;
}
