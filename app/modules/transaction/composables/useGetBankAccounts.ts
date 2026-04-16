import { getBankAccounts } from "../services/get-bank-accounts.services";
import type { IBankAccountOption } from "../types/bank-account-option.type";

export const useGetBankAccounts = () => {
  const data = ref<IBankAccountOption[]>([]);
  const isLoading = ref(false);

  const handle = async (): Promise<void> => {
    isLoading.value = true;
    try {
      data.value = getBankAccounts();
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
