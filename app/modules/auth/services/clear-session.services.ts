import { SESSION_KEY } from "~/modules/auth/constants";
import { storage } from "~/lib/storage";

export const clearSession = (): void => {
  storage.remove(SESSION_KEY);
};
