import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Formato de correo no válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type ILoginFormData = z.infer<typeof loginSchema>;
