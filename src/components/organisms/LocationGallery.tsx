"use client";

import { useEffect, useState } from "react";
import { getLocations } from "@/lib/api";

/** Cargo y presento el listado paginado de ubicaciones del multiverso. */
export function LocationGallery({ page = 1 }: { page?: number }) {
  const [locations, setLocations] = useState<Awaited<ReturnType<typeof getLocations>>["results"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      if (!active) return;
      setLoading(true);
      setError("");
      getLocations(page)
        .then((response) => {
          if (active) setLocations(response.results);
        })
        .catch(() => {
          if (active) setError("No pude cargar las ubicaciones.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [page]);

  if (loading) return <p className="feedback-state">Cargando ubicaciones...</p>;
  if (error) return <p className="feedback-state">{error}</p>;

  return (
    <section className="content-section">
      <div className="location-grid">
        {locations.map((location) => (
          <article key={location.id} className="location-card">
            <h2>{location.name}</h2>
            <p>{location.type}</p>
            <p>{location.dimension}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
