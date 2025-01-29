import { z } from "zod";

export const testResultSchema = z.object({
  userId: z.number().int().positive("ID do usuário inválido"),
  questionId: z.number().int().positive("ID da questão inválido"),
  givenAnswer: z.string().min(1, "A resposta fornecida não pode estar vazia"),
  correctAnswer: z.string().min(1, "A resposta correta não pode estar vazia"),
  score: z.number().min(0).max(10, "A pontuação deve estar entre 0 e 10"),
});
