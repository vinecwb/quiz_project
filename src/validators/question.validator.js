import { z } from "zod";

export const questionSchema = z.object({
  subjectId: z.number().int().positive("ID da matéria inválido"),
  question: z.string().min(5, "A pergunta deve ter pelo menos 5 caracteres"),
  options: z.array(z.string()).length(4, "Deve haver exatamente 4 opções"),
  answer: z.string().min(1, "A resposta não pode estar vazia"),
});
