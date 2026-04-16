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
      .string({ required_error: "El nombre completo es requerido" })
      .min(1, "El nombre completo es requerido")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras y espacios"),
    documentType: z
      .string({ required_error: "El tipo de documento es requerido" })
      .min(1, "El tipo de documento es requerido"),
    documentNumber: z
      .string({ required_error: "El número de documento es requerido" })
      .min(1, "El número de documento es requerido"),
    phone: z
      .string({ required_error: "El teléfono es requerido" })
      .min(1, "El teléfono es requerido")
      .regex(/^\d{9}$/, "9 dígitos requeridos"),
    birthDate: z
      .string({ required_error: "La fecha de nacimiento es requerida" })
      .min(1, "La fecha de nacimiento es requerida")
      .refine(isValidDate, "Fecha inválida")
      .refine((v) => !isValidDate(v) || getAge(v) >= 18, "Debes ser mayor de edad"),
    previousExchange: z.string().optional(),
    termsAccepted: z
      .boolean({ required_error: "Debes aceptar los términos" })
      .refine((v) => v, "Debes aceptar los términos"),
    privacyAccepted: z
      .boolean({ required_error: "Debes aceptar la política de privacidad" })
      .refine((v) => v, "Debes aceptar la política de privacidad"),
  })
  .superRefine(({ documentType, documentNumber }, ctx) => {
    if (!documentNumber) return;
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
