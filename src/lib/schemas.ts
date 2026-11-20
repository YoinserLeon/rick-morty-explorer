import { z } from "zod";

/** Valido el formulario de registro y la coincidencia de contraseñas. */
export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Escribe al menos 2 caracteres.").max(60),
    email: z.email("Introduce un correo electrónico válido."),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").max(100),
    confirmPassword: z.string().min(1, "Confirma tu contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

/** Valido las credenciales del formulario de inicio de sesión. */
export const loginSchema = z.object({
  email: z.email("Introduce un correo electrónico válido."),
  password: z.string().min(1, "Introduce tu contraseña."),
});

/** Valido el cambio de contraseña y la confirmación de la nueva clave. */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Introduce tu contraseña actual."),
    newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres.").max(100),
    confirmPassword: z.string().min(1, "Confirma tu nueva contraseña."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas nuevas no coinciden.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "La nueva contraseña debe ser diferente a la actual.",
    path: ["newPassword"],
  });

/** Infiero el tipo seguro de los datos de registro. */
export type RegisterInput = z.infer<typeof registerSchema>;

/** Infiero el tipo seguro de las credenciales de acceso. */
export type LoginInput = z.infer<typeof loginSchema>;

/** Infiero el tipo seguro del formulario de cambio de contraseña. */
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

const referenceSchema = z.object({ name: z.string(), url: z.string() });
const infoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
});

/** Compruebo que cada personaje remoto tenga la estructura esperada. */
export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: referenceSchema,
  location: referenceSchema,
  image: z.url(),
  episode: z.array(z.url()),
  url: z.url(),
  created: z.string(),
});

/** Compruebo la estructura completa de la respuesta de personajes. */
export const charactersResponseSchema = z.object({
  info: infoSchema,
  results: z.array(characterSchema),
});

/** Compruebo la estructura de los episodios recibidos desde la API. */
export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.string(),
  episode: z.string(),
  characters: z.array(z.url()),
  url: z.url(),
  created: z.string(),
});

/** Compruebo la estructura completa de la respuesta de episodios. */
export const episodesResponseSchema = z.object({
  info: infoSchema,
  results: z.array(episodeSchema),
});

/** Compruebo la estructura de una ubicación remota. */
export const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  dimension: z.string(),
  residents: z.array(z.url()),
  url: z.url(),
  created: z.string(),
});

/** Compruebo la estructura completa de la respuesta de ubicaciones. */
export const locationsResponseSchema = z.object({
  info: infoSchema,
  results: z.array(locationSchema),
});
