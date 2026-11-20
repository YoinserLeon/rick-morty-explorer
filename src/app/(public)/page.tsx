import Link from "next/link";
import { FiArrowRight, FiCompass, FiHeart } from "react-icons/fi";
import { HeroSection } from "@/components/organisms/HeroSection";
import { CharacterExplorer } from "@/components/organisms/CharacterExplorer";

/** Renderizo el inicio con el portal principal y personajes destacados. */
export default function HomePage() {
  return (
    <>
      <div className="page-shell">
        <HeroSection />
        <CharacterExplorer featured />
        <section className="discovery-strip">
          <div className="discovery-strip__item">
            <span><FiCompass aria-hidden="true" /></span>
            <div><strong>Explora la galería</strong><p>Descubre ubicaciones improbables.</p></div>
            <Link href="/galeria" aria-label="Explorar dimensiones"><FiArrowRight /></Link>
          </div>
          <div className="discovery-strip__item">
            <span><FiHeart aria-hidden="true" /></span>
            <div><strong>Guarda tus favoritos</strong><p>Construye tu propia colección.</p></div>
            <Link href="/personajes" aria-label="Guardar personajes"><FiArrowRight /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
