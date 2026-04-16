import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import type { ILoginPayload } from "~/modules/auth/types/login-payload.type";
import type { APIError } from "~/types";
import { findUserByCredentials } from "~/modules/auth/services/find-user-by-credentials.services";

interface ILogin {
  payload: ILoginPayload;
}

export const login = ({ payload }: ILogin): IAuthUser => {
  const user = findUserByCredentials({ payload });
  if (!user) {
    throw {
      success: false,
      data: {
        name: "INVALID_CREDENTIALS",
        title: "Credenciales inválidas",
        message: "El correo o la contraseña son incorrectos.",
      },
    } satisfies APIError;
  }
  return { email: user.email, fullName: user.fullName };
};
