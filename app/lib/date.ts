import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const parseDMY = (date: string) => dayjs(date, "DD/MM/YYYY", true);

export const isValidDate = (date: string) => parseDMY(date).isValid();

export const getAge = (date: string) => dayjs().diff(parseDMY(date), "year");

export const dateToDMY = (date: Date): string =>
  dayjs(date).format("DD/MM/YYYY");

export const dmyToDate = (dmy: string): Date =>
  isValidDate(dmy) ? parseDMY(dmy).toDate() : new Date();

export const formatDate = (text: string): string => {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export const getUpdateTime = (): string => dayjs().format("HH:mm");

export const dmyToISO = (dmy: string): string =>
  isValidDate(dmy) ? parseDMY(dmy).format("YYYY-MM-DD") : "";

export const isoToDMY = (iso: string): string => {
  const d = dayjs(iso, "YYYY-MM-DD", true);
  return d.isValid() ? d.format("DD/MM/YYYY") : "";
};

export const isoToDate = (iso: string): Date =>
  dayjs(iso, "YYYY-MM-DD", true).toDate();

export const dateToISO = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD");

export const getMaxBirthDate = (minAge: number = 18): string =>
  dayjs().subtract(minAge, "year").format("YYYY-MM-DD");

export const getDefaultBirthPage = (defaultAge: number = 25): { month: number; year: number } => {
  const d = dayjs().subtract(defaultAge, "year");
  return { month: d.month() + 1, year: d.year() };
};
