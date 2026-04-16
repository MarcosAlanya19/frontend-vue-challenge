import type { IMockUser } from "~/modules/auth/types/mock-user.type";
import { MOCK_DB_KEY } from "~/modules/auth/constants";
import { storage } from "~/lib/storage";

interface ISaveUserPayload {
  user: IMockUser;
}

interface ISaveUser {
  payload: ISaveUserPayload;
}

export const saveUser = ({ payload }: ISaveUser): void => {
  const raw = storage.get(MOCK_DB_KEY);
  const stored: IMockUser[] = raw ? JSON.parse(raw) : [];
  const idx = stored.findIndex((u) => u.email === payload.user.email);
  if (idx >= 0) stored[idx] = payload.user;
  else stored.push(payload.user);
  storage.set(MOCK_DB_KEY, JSON.stringify(stored));
};
