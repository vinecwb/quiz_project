import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  lastname: z.string().min(3, "O sobrenome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  isTeacher: z.boolean().optional(),
});
