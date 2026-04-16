import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import { SESSION_KEY } from "~/modules/auth/constants";
import { storage } from "~/lib/storage";

export const saveSession = (user: IAuthUser): void => {
  storage.set(SESSION_KEY, JSON.stringify(user));
};
