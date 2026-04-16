import { getAllUsers } from "~/modules/auth/services/get-all-users.services";

interface IExistsByEmailPayload {
  email: string;
}

interface IExistsByEmail {
  payload: IExistsByEmailPayload;
}

export const existsByEmail = ({ payload }: IExistsByEmail): boolean =>
  getAllUsers().some((u) => u.email === payload.email);
