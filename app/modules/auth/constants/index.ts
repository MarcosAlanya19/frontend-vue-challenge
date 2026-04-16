import type { IMockUser } from "~/modules/auth/types/mock-user.type";
import { EDocumentType } from "~/modules/auth/enums/document-type.enum";

export const SESSION_KEY = "auth_session";

export const MOCK_DB_KEY = "mock_db_users";

export const SEED_USERS: IMockUser[] = [
  {
    email: "marcos@gmail.com",
    password: "123456",
    fullName: "Marcos Alanya",
    documentType: EDocumentType.DNI,
    documentNumber: "74845954",
    phone: "987654321",
    birthDate: "15/06/1990",
  },
];
