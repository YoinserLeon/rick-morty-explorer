"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiAlertCircle, FiCheckCircle, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useAuth } from "@/components/providers/AuthProvider";
import { changePasswordSchema, loginSchema, registerSchema } from "@/lib/schemas";

type AuthMode = "login" | "register" | "password";
type FormValues = Record<string, string>;

const fieldConfig: Record<AuthMode, { key: string; label: string; type: string; placeholder: string }[]> = {
  login: [
    { key: "email", label: "Correo electrónico", type: "email", placeholder: "tu@email.com" },
    { key: "password", label: "Contraseña", type: "password", placeholder: "Tu contraseña" },
  ],
  register: [
    { key: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
    { key: "email", label: "Correo electrónico", type: "email", placeholder: "tu@email.com" },
    { key: "password", label: "Contraseña", type: "password", placeholder: "Mínimo 8 caracteres" },
    { key: "confirmPassword", label: "Confirmar contraseña", type: "password", placeholder: "Repite tu contraseña" },
  ],
  password: [
    { key: "currentPassword", label: "Contraseña actual", type: "password", placeholder: "Contraseña actual" },
    { key: "newPassword", label: "Nueva contraseña", type: "password", placeholder: "Mínimo 8 caracteres" },
    { key: "confirmPassword", label: "Confirmar nueva contraseña", type: "password", placeholder: "Repite la nueva contraseña" },
  ],
};

const titles: Record<AuthMode, { eyebrow: string; title: string; description: string; submit: string }> = {
  login: { eyebrow: "IDENTIFICACIÓN // C-137", title: "Bienvenido de vuelta", description: "Vuelve a tu estación de exploración.", submit: "Entrar al portal" },
  register: { eyebrow: "NUEVO VIAJERO // MULTIVERSO", title: "Crear cuenta", description: "Prepara tu expediente y guarda tus personajes favoritos.", submit: "Crear mi cuenta" },
  password: { eyebrow: "SEGURIDAD // TERMINAL", title: "Cambiar contraseña", description: "Actualiza la clave de acceso de tu cuenta local.", submit: "Actualizar contraseña" },
};

/** Presento y valido los formularios locales de cuenta con sus esquemas Zod. */
export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const auth = useAuth();
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const config = titles[mode];

  /** Actualizo el campo y retiro el mensaje de error asociado. */
  function updateField(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setMessage("");
  }

  /** Traduzco los errores Zod en mensajes junto a cada campo. */
  function showValidationErrors(issues: { path: PropertyKey[]; message: string }[]) {
    const nextErrors: Record<string, string> = {};
    issues.forEach((issue) => {
      const field = String(issue.path[0] ?? "form");
      if (!nextErrors[field]) nextErrors[field] = issue.message;
    });
    setErrors(nextErrors);
  }

  /** Valido y ejecuto la operación adecuada para cada tipo de formulario. */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setErrors({});
    setSuccess(false);
    try {
      if (mode === "register") {
        const parsed = registerSchema.safeParse({
          name: values.name ?? "",
          email: values.email ?? "",
          password: values.password ?? "",
          confirmPassword: values.confirmPassword ?? "",
        });
        if (!parsed.success) {
          showValidationErrors(parsed.error.issues);
          return;
        }
        await auth.register(parsed.data);
        router.push("/");
      } else if (mode === "login") {
        const parsed = loginSchema.safeParse({ email: values.email ?? "", password: values.password ?? "" });
        if (!parsed.success) {
          showValidationErrors(parsed.error.issues);
          return;
        }
        await auth.login(parsed.data);
        router.push("/");
      } else {
        const parsed = changePasswordSchema.safeParse({
          currentPassword: values.currentPassword ?? "",
          newPassword: values.newPassword ?? "",
          confirmPassword: values.confirmPassword ?? "",
        });
        if (!parsed.success) {
          showValidationErrors(parsed.error.issues);
          return;
        }
        await auth.changePassword(parsed.data);
        setSuccess(true);
        setMessage("Tu contraseña local fue actualizada correctamente.");
        setValues({});
      }
    } catch (submitError) {
      setMessage(submitError instanceof Error ? submitError.message : "No pude completar la operación.");
    } finally {
      setBusy(false);
    }
  }

  if (mode === "password" && !auth.user && auth.ready) {
    return (
      <div className="auth-card">
        <p className="eyebrow">ACCESO RESTRINGIDO</p>
        <h1>Inicia sesión primero</h1>
        <p>Necesitas una sesión local para cambiar tu contraseña.</p>
        <Link href="/login" className="button button--primary">Ir al acceso</Link>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <p className="eyebrow"><span className="eyebrow__dot" /> {config.eyebrow}</p>
      <h1>{config.title}</h1>
      <p className="auth-card__description">{config.description}</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {fieldConfig[mode].map((field) => (
          <div className="form-field" key={field.key}>
            <label htmlFor={field.key}>{field.label}</label>
            <div className="form-field__control">
              {field.key === "name" ? <FiUser aria-hidden="true" /> : field.type === "email" ? <FiMail aria-hidden="true" /> : <FiLock aria-hidden="true" />}
              <input
                id={field.key}
                name={field.key}
                type={field.type}
                autoComplete={field.type === "password" ? (field.key === "currentPassword" ? "current-password" : mode === "login" ? "current-password" : "new-password") : field.type === "email" ? "email" : "name"}
                placeholder={field.placeholder}
                value={values[field.key] ?? ""}
                onChange={(event) => updateField(field.key, event.target.value)}
                aria-invalid={Boolean(errors[field.key])}
                aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                disabled={busy}
              />
            </div>
            {errors[field.key] ? <small id={`${field.key}-error`} className="field-error">{errors[field.key]}</small> : null}
          </div>
        ))}
        {message ? (
          <p className={success ? "form-message form-message--success" : "form-message form-message--error"} role="status">
            {success ? <FiCheckCircle aria-hidden="true" /> : <FiAlertCircle aria-hidden="true" />}{message}
          </p>
        ) : null}
        <button className="button button--primary auth-form__submit" type="submit" disabled={busy || !auth.ready}>
          {busy ? "Procesando..." : config.submit}
        </button>
      </form>
      {mode === "login" ? <p className="auth-card__switch">¿Todavía no tienes cuenta? <Link href="/registro">Crear cuenta</Link></p> : null}
      {mode === "register" ? <p className="auth-card__switch">¿Ya tienes cuenta? <Link href="/login">Iniciar sesión</Link></p> : null}
      {mode === "password" ? <p className="auth-card__switch"><button type="button" onClick={() => auth.logout()} className="text-link">Cerrar sesión</button></p> : null}
      <p className="auth-card__notice">Modo demostración: la cuenta se guarda en este navegador y no sustituye una autenticación de producción.</p>
    </div>
  );
}
