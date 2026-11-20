"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { changePasswordSchema, loginSchema, registerSchema } from "@/lib/schemas";
import type { ChangePasswordInput, LoginInput, RegisterInput } from "@/lib/schemas";
import { createLocalUser, hashPassword } from "@/lib/auth/client";
import type { LocalUser } from "@/lib/auth/client";
import { normalizeEmail } from "@/lib/utils";

interface AuthContextValue {
  user: Pick<LocalUser, "id" | "name" | "email"> | null;
  ready: boolean;
  register: (input: RegisterInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  changePassword: (input: ChangePasswordInput) => Promise<void>;
}

/** Creo el contexto que compartiré con las vistas de cuenta. */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USERS_KEY = "rm-explorer-users";
const SESSION_KEY = "rm-explorer-session";
const EMPTY_USERS: LocalUser[] = [];
let cachedUsersRaw: string | null | undefined;
let cachedUsersSnapshot: LocalUser[] = EMPTY_USERS;

/** Suscribo el componente a cambios de almacenamiento en el navegador. */
function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/** Leo datos persistidos y descarto valores que no tengan la forma de cuentas. */
function readUsers(): LocalUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (raw === cachedUsersRaw) return cachedUsersSnapshot;
    cachedUsersRaw = raw;
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      cachedUsersSnapshot = EMPTY_USERS;
      return EMPTY_USERS;
    }
    cachedUsersSnapshot = parsed.filter(
      (item): item is LocalUser =>
        typeof item === "object" && item !== null &&
        "id" in item && "name" in item && "email" in item && "salt" in item &&
        "passwordHash" in item && "createdAt" in item &&
        typeof item.id === "string" && typeof item.name === "string" &&
        typeof item.email === "string" && typeof item.salt === "string" &&
        typeof item.passwordHash === "string" && typeof item.createdAt === "string",
    );
    return cachedUsersSnapshot;
  } catch {
    cachedUsersRaw = null;
    cachedUsersSnapshot = EMPTY_USERS;
    return EMPTY_USERS;
  }
}

/** Obtengo el snapshot vacío de usuarios durante la renderización en servidor. */
function getServerUsers(): LocalUser[] {
  return EMPTY_USERS;
}

/** Leo el correo de la sesión activa desde el almacenamiento local. */
function readSessionEmail(): string | null {
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

/** Devuelvo sesión nula durante la renderización en servidor. */
function getServerSessionEmail(): string | null {
  return null;
}

/** Administro registro, sesión y cambio de contraseña sin servidor externo. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setVersion] = useState(0);
  const users = useSyncExternalStore(subscribeStorage, readUsers, getServerUsers);
  const sessionEmail = useSyncExternalStore(subscribeStorage, readSessionEmail, getServerSessionEmail);
  const ready = useSyncExternalStore(
    subscribeStorage,
    () => true,
    () => false,
  );

  /** Fuerzo una nueva lectura del almacenamiento tras modificar datos. */
  const refreshStorage = useCallback(() => {
    cachedUsersRaw = undefined;
    setVersion((current) => current + 1);
  }, []);

  /** Guardo la nueva colección de usuarios en almacenamiento local. */
  const persistUsers = useCallback((nextUsers: LocalUser[]) => {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    refreshStorage();
  }, [refreshStorage]);

  /** Registro una cuenta nueva y abro su sesión local. */
  const register = useCallback(async (input: RegisterInput) => {
    const data = registerSchema.parse(input);
    const email = normalizeEmail(data.email);
    const latestUsers = readUsers();
    if (latestUsers.some((item) => item.email === email)) {
      throw new Error("Ya existe una cuenta con ese correo electrónico.");
    }
    const newUser = await createLocalUser(data);
    const nextUsers = [...latestUsers, newUser];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    window.localStorage.setItem(SESSION_KEY, newUser.email);
    refreshStorage();
  }, [refreshStorage]);

  /** Verifico el hash almacenado antes de crear una sesión. */
  const login = useCallback(async (input: LoginInput) => {
    const data = loginSchema.parse(input);
    const email = normalizeEmail(data.email);
    const currentUsers = readUsers();
    const existingUser = currentUsers.find((item) => item.email === email);
    if (!existingUser) throw new Error("El correo o la contraseña no son correctos.");
    const candidateHash = await hashPassword(data.password, existingUser.salt);
    if (candidateHash !== existingUser.passwordHash) {
      throw new Error("El correo o la contraseña no son correctos.");
    }
    window.localStorage.setItem(SESSION_KEY, existingUser.email);
    refreshStorage();
  }, [refreshStorage]);

  /** Cierro la sesión actual y retiro su referencia del navegador. */
  const logout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    refreshStorage();
  }, [refreshStorage]);

  /** Cambio la contraseña después de verificar la contraseña actual. */
  const changePassword = useCallback(async (input: ChangePasswordInput) => {
    const data = changePasswordSchema.parse(input);
    if (!sessionEmail) throw new Error("Inicia sesión antes de cambiar tu contraseña.");
    const currentUsers = [...readUsers()];
    const index = currentUsers.findIndex((item) => item.email === sessionEmail);
    if (index < 0) throw new Error("No encontré la cuenta de esta sesión.");
    const existingUser = currentUsers[index];
    const currentHash = await hashPassword(data.currentPassword, existingUser.salt);
    if (currentHash !== existingUser.passwordHash) {
      throw new Error("La contraseña actual no es correcta.");
    }
    const credential = await createLocalUser({
      name: existingUser.name,
      email: existingUser.email,
      password: data.newPassword,
      confirmPassword: data.newPassword,
    });
    const updatedUser: LocalUser = {
      ...existingUser,
      salt: credential.salt,
      passwordHash: credential.passwordHash,
    };
    currentUsers[index] = updatedUser;
    persistUsers(currentUsers);
  }, [persistUsers, sessionEmail]);

  /** Derivo los datos públicos de la cuenta activa sin exponer credenciales. */
  const user = useMemo(() => {
    const found = users.find((item) => item.email === sessionEmail);
    return found ? { id: found.id, name: found.name, email: found.email } : null;
  }, [users, sessionEmail]);

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Expongo las operaciones de cuenta a formularios y navegación. */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider.");
  return context;
}