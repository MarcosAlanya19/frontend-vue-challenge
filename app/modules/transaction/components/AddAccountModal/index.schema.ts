import { z } from "zod";

export const addAccountSchema = z.object({
  accountType: z.string().min(1, "Requerido"),
  accountNumber: z
    .string()
    .min(1, "Requerido")
    .regex(/^\d+$/, "Solo dígitos permitidos"),
  bankId: z.string().min(1, "Requerido"),
  alias: z.string().min(1, "Requerido"),
  ownerConfirm: z.boolean().refine((v) => v, "Requerido"),
});

export type AddAccountFormData = z.infer<typeof addAccountSchema>;
