import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit avoir au moins 6 caractères"),
});

export type LoginFormInput = z.infer<typeof loginSchema>;
