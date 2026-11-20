import type { RegisterInput } from "@/lib/schemas";
import { normalizeEmail } from "@/lib/utils";

/** Represento una cuenta de demostración almacenada únicamente en el navegador. */
export interface LocalUser {
  id: string;
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
}

const ITERATIONS = 150_000;
const KEY_LENGTH = 256;

/** Transformo un arreglo de bytes a hexadecimal para persistirlo sin pérdida. */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Transformo una cadena hexadecimal en bytes para Web Crypto. */
function hexToBytes(hex: string): ArrayBuffer {
  const values = hex.match(/.{1,2}/g) ?? [];
  const bytes = new Uint8Array(values.map((value) => Number.parseInt(value, 16)));
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

/** Derivo un hash PBKDF2 con sal aleatoria para la demo local. */
export async function hashPassword(password: string, saltHex: string): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: hexToBytes(saltHex),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH,
  );
  return bytesToHex(new Uint8Array(bits));
}

/** Creo una sal aleatoria criptográficamente segura para cada usuario. */
export function createSalt(): string {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return bytesToHex(salt);
}

/** Genero un identificador aleatorio para la cuenta local. */
export function createUserId(): string {
  return crypto.randomUUID();
}

/** Construyo el registro seguro en memoria a partir de los datos validados. */
export async function createLocalUser(input: RegisterInput): Promise<LocalUser> {
  const salt = createSalt();
  const passwordHash = await hashPassword(input.password, salt);
  return {
    id: createUserId(),
    name: input.name.trim(),
    email: normalizeEmail(input.email),
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
}
