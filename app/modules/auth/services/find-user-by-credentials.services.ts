import type { IMockUser } from "~/modules/auth/types/mock-user.type";
import { getAllUsers } from "~/modules/auth/services/get-all-users.services";

interface IFindUserByCredentialsPayload {
  email: string;
  password: string;
}

interface IFindUserByCredentials {
  payload: IFindUserByCredentialsPayload;
}

export const findUserByCredentials = ({
  payload,
}: IFindUserByCredentials): IMockUser | null =>
  getAllUsers().find(
    (u) => u.email === payload.email && u.password === payload.password,
  ) ?? null;
