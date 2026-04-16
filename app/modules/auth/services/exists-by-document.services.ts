import { getAllUsers } from "~/modules/auth/services/get-all-users.services";

interface IExistsByDocumentPayload {
  documentType: string;
  documentNumber: string;
}

interface IExistsByDocument {
  payload: IExistsByDocumentPayload;
}

export const existsByDocument = ({ payload }: IExistsByDocument): boolean =>
  getAllUsers().some(
    (u) =>
      u.documentType === payload.documentType &&
      u.documentNumber === payload.documentNumber,
  );
