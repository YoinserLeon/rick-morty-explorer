import type { ReactNode } from "react";

/** Estandarizo los títulos de sección con una marca visual de portal. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p className="section-title__description">{description}</p> : null}
      </div>
      {action ? <div className="section-title__action">{action}</div> : null}
    </div>
  );
}
