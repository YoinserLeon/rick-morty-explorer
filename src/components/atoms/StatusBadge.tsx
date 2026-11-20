import { translateStatus } from "@/lib/utils";

/** Presento el estado vital con un indicador de color y texto. */
export function StatusBadge({ status }: { status: string }) {
  const statusClass = status === "Alive" ? "alive" : status === "Dead" ? "dead" : "unknown";
  return (
    <span className={`status-badge status-badge--${statusClass}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {translateStatus(status)}
    </span>
  );
}
