import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";

/** Cierro las páginas con créditos y enlaces útiles del proyecto. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">RICK AND MORTY <span>EXPLORER</span></p>
        <p>Un proyecto de exploración del multiverso, creado por fans.</p>
        <div className="site-footer__links">
          <Link href="/personajes">Personajes</Link>
          <a href="https://rickandmortyapi.com/documentation" target="_blank" rel="noreferrer">
            API <FiExternalLink aria-hidden="true" />
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub <FiGithub aria-hidden="true" />
          </a>
        </div>
        <small>Este proyecto es una aplicación fan no oficial y no está afiliada a Adult Swim.</small>
      </div>
    </footer>
  );
}
