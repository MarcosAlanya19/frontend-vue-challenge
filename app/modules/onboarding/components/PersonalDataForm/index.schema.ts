import { z } from "zod";

const isValidDate = (value: string): boolean => {
  const [d, m, y] = value.split("/");
  if (!d || !m || !y || y.length !== 4) return false;
  const date = new Date(`${y}-${m}-${d}`);
  return !isNaN(date.getTime());
};

const getAge = (value: string): number => {
  const [d, m, y] = value.split("/");
  const birth = new Date(`${y}-${m}-${d}`);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate()))
    age--;
  return age;
};

const documentNumberRules: Record<string, (n: string) => string | null> = {
  DNI: (n) => (/^\d{8}$/.test(n) ? null : "8 dígitos requeridos"),
  CE: (n) => (/^\d{9}$/.test(n) ? null : "9 dígitos requeridos"),
  PASAPORTE: (n) =>
    n.length >= 8 && n.length <= 15 ? null : "Entre 8 y 15 caracteres",
};

export const personalDataSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Requerido")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras y espacios"),
    documentType: z.string().min(1, "Requerido"),
    documentNumber: z.string().min(1, "Requerido"),
    phone: z.string().regex(/^\d{9}$/, "9 dígitos requeridos"),
    birthDate: z
      .string()
      .min(1, "Requerido")
      .refine(isValidDate, "Fecha inválida")
      .refine((v) => getAge(v) >= 18, "Debes ser mayor de edad"),
    previousExchange: z.string().optional(),
    termsAccepted: z.boolean().refine((v) => v, "Requerido"),
    privacyAccepted: z.boolean().refine((v) => v, "Requerido"),
  })
  .superRefine(({ documentType, documentNumber }, ctx) => {
    const rule = documentNumberRules[documentType];
    if (!rule) return;
    const error = rule(documentNumber);
    if (error)
      ctx.addIssue({
        code: "custom",
        message: error,
        path: ["documentNumber"],
      });
  });

export type PersonalDataFormData = z.infer<typeof personalDataSchema>;
