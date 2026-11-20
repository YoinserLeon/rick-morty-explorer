import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/AuthForm";

export const metadata: Metadata = { title: "Crear cuenta" };

/** Renderizo el formulario Zod para crear una cuenta de demostración. */
export default function RegisterPage() {
  return <div className="page-shell page-shell--auth"><AuthForm mode="register" /></div>;
}
