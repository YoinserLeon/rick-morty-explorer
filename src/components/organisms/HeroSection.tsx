import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";

/** Presento a Rick y Morty con el recorte PNG que elegí para la portada. */
export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section__copy">
        <p className="eyebrow"><span className="eyebrow__dot" /> SERIE ANIMADA // MULTIVERSO</p>
        <h1><span>RICK AND</span><strong>MORTY</strong></h1>
        <p className="hero-section__lead">Una familia. Infinitos universos.</p>
        <p className="hero-section__description">
          Rick Sanchez y su nieto Morty viajan por dimensiones imposibles. Explora sus personajes,
          descubre nuevos mundos y arma tu propia colección del multiverso.
        </p>
        <div className="hero-section__actions">
          <Link href="/personajes" className="button button--primary"><FiPlay aria-hidden="true" /> Explorar personajes</Link>
          <Link href="/galeria" className="button button--outline">Mi galería <FiArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="hero-section__coordinates"><span>COORDENADAS</span><strong> C-137 // DIMENSION 35-C</strong></div>
      </div>
      <div className="hero-visual" aria-label="Rick Sanchez y Morty Smith">
        <div className="hero-visual__stars" />
        <div className="portal portal--outer" />
        <div className="portal portal--inner" />
        <div className="hero-visual__planet hero-visual__planet--one" />
        <div className="hero-visual__planet hero-visual__planet--two" />
        <Image
          src="/images/rick-morty-hero.png"
          alt="Rick Sanchez sosteniendo su pistola de portales junto a Morty Smith"
          width={389}
          height={376}
          priority
          className="hero-visual__art"
        />
        <div className="hero-visual__caption">PORTAL GUN // ONLINE</div>
      </div>
    </section>
  );
}
