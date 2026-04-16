import type { IMockUser } from "~/modules/auth/types/mock-user.type";
import { MOCK_DB_KEY, SEED_USERS } from "~/modules/auth/constants";
import { storage } from "~/lib/storage";

export const getAllUsers = (): IMockUser[] => {
  const raw = storage.get(MOCK_DB_KEY);
  const stored: IMockUser[] = raw ? JSON.parse(raw) : [];
  return [...SEED_USERS, ...stored];
};
