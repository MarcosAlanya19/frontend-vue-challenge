import sourceFundsData from "../../../../mocks/sourceFunds.json";
import type { IFundSourceOption } from "../types/fund-source-option.type";

export const getSourceFunds = (): IFundSourceOption[] =>
  sourceFundsData.map((fund) => ({
    label: fund.name,
    value: fund._id,
  }));
