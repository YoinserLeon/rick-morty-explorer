import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/AuthForm";

export const metadata: Metadata = { title: "Iniciar sesión" };

/** Renderizo el formulario Zod de inicio de sesión local. */
export default function LoginPage() {
  return <div className="page-shell page-shell--auth"><AuthForm mode="login" /></div>;
}
