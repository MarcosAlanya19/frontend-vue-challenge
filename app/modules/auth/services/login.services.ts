import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import type { ILoginPayload } from "~/modules/auth/types/login-payload.type";
import { findUserByCredentials } from "~/modules/auth/services/find-user-by-credentials.services";

interface ILogin {
  payload: ILoginPayload;
}

export const login = ({ payload }: ILogin): IAuthUser | null => {
  const user = findUserByCredentials({ payload });
  if (!user) return null;
  return { email: user.email, fullName: user.fullName };
};
