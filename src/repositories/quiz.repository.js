import { prisma } from "../services/prisma.js";

export const getRandomQuestions = async (count = 5) => {
  return await prisma.question.findMany({
    take: count,
    orderBy: { id: "asc" },
    select: { id: true, question: true, options: true },
  });
};

export const checkAnswers = async (answers) => {
  let score = 0;
  for (const { id, answer } of answers) {
    const question = await prisma.question.findUnique({ where: { id } });
    if (question?.answer === answer) score += 2;
  }
  return score;
};
