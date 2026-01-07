import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères"),
});

export type LoginFormInput = z.infer<typeof loginSchema>;
