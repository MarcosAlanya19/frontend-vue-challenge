import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El correo es requerido" })
    .min(1, "El correo es requerido")
    .email("Formato de correo no válido"),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida"),
});

export type ILoginFormData = z.infer<typeof loginSchema>;
