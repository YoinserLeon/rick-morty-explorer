import Link from "next/link";

/** Presento una ruta de recuperación cuando no existe el recurso solicitado. */
export default function NotFound() {
  return (
    <div className="page-shell page-shell--auth">
      <div className="auth-card not-found-card">
        <p className="eyebrow">ERROR // 404</p>
        <h1>Dimensión no localizada</h1>
        <p>La ruta que buscas no aparece en nuestros registros multiversales.</p>
        <Link href="/" className="button button--primary">Regresar al inicio</Link>
      </div>
    </div>
  );
}
