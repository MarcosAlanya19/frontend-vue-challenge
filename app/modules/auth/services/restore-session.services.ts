import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import { SESSION_KEY } from "~/modules/auth/constants";
import { storage } from "~/lib/storage";

export const restoreSession = (): IAuthUser | null => {
  const raw = storage.get(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as IAuthUser;
  } catch {
    storage.remove(SESSION_KEY);
    return null;
  }
};
