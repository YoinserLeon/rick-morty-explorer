import type { Metadata } from "next";
import { FavoriteGallery } from "@/components/organisms/FavoriteGallery";

export const metadata: Metadata = { title: "Mi galería" };

/** Reúno los personajes que el usuario ha marcado como favoritos. */
export default function GalleryPage() {
  return <div className="page-shell page-shell--inner">
    <header className="page-intro"><p className="eyebrow"><span className="eyebrow__dot" /> COLECCIÓN PERSONAL</p><h1>Mi <span>galería</span></h1><p>Los personajes que guardes aparecerán aquí. Tu colección, a tu manera.</p></header>
    <FavoriteGallery />
  </div>;
}
