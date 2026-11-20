import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/AuthForm";

export const metadata: Metadata = { title: "Configuración de cuenta" };

/** Permito actualizar la contraseña de la cuenta local desde configuración. */
export default function SettingsPage() {
  return <div className="page-shell page-shell--auth"><AuthForm mode="password" /></div>;
}
