import { EDocumentType } from "~/modules/auth/enums/document-type.enum";
import bankAccounts from "~~/mocks/bankAccounts.json";

export const MOCK_PASSWORD = "123456";

export const DOC_TYPE_OPTIONS = [
  { label: "DNI", value: EDocumentType.DNI },
  { label: "CE", value: EDocumentType.CE },
  { label: "Pasaporte", value: EDocumentType.PASAPORTE },
];

interface IBankAccount {
  name: string;
  alias: string;
  id: string;
}

export const PREVIOUS_EXCHANGE_OPTIONS = (bankAccounts as IBankAccount[]).map(
  (bank) => ({
    label: bank.alias,
    value: bank.id,
  }),
);
