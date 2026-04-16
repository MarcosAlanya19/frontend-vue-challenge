import type { EDocumentType } from "~/modules/auth/enums/document-type.enum";

export interface IMockUser {
  email: string;
  password: string;
  fullName: string;
  documentType: EDocumentType;
  documentNumber: string;
  phone: string;
  birthDate: string;
}
