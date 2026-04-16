import { EActiveField } from "~/modules/calculator/enums/active-field.enum";
import { ECurrency } from "~/enums/currency.enum";

export const getCurrencies = (field: EActiveField, compra: boolean) => {
  const isSend = field === EActiveField.Send;
  return {
    origin: isSend
      ? compra ? ECurrency.USD : ECurrency.PEN
      : compra ? ECurrency.PEN : ECurrency.USD,
    destination: isSend
      ? compra ? ECurrency.PEN : ECurrency.USD
      : compra ? ECurrency.USD : ECurrency.PEN,
  };
};
