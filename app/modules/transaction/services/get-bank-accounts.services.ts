import bankAccountsData from "../../../../mocks/bankAccounts.json";
import type { IBankAccountOption } from "../types/bank-account-option.type";

export const getBankAccounts = (): IBankAccountOption[] =>
  bankAccountsData.map((bank) => ({
    label: bank.name,
    shortLabel: bank.alias,
    value: bank.id,
  }));
