import { getSourceFunds } from "../services/get-source-funds.services";
import type { IFundSourceOption } from "../types/fund-source-option.type";

export const useGetSourceFunds = () => {
  const data = ref<IFundSourceOption[]>([]);
  const isLoading = ref(false);

  const handle = async (): Promise<void> => {
    isLoading.value = true;
    try {
      data.value = getSourceFunds();
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
