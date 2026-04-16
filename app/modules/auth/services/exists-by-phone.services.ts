import { getAllUsers } from "~/modules/auth/services/get-all-users.services";

interface IExistsByPhonePayload {
  phone: string;
}

interface IExistsByPhone {
  payload: IExistsByPhonePayload;
}

export const existsByPhone = ({ payload }: IExistsByPhone): boolean =>
  getAllUsers().some((u) => u.phone === payload.phone);
