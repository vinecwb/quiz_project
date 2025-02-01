import { prisma } from "../services/prisma.js";

export const createQuiz = async ({ title, subjectId, questions }) => {
  const quiz = await prisma.quiz.create({
    data: {
      title,
      subject: { connect: { id: subjectId } },
      questions: {
        create: questions.map(q => ({
          text: q.text,
          correctAnswer: q.correctAnswer,
          // Armazenando as opções como JSON (string)
          options: JSON.stringify(q.options)
        }))
      }
    },
    include: { questions: true }
  });
  return quiz;
};

export const getQuizById = async (id) => {
  return await prisma.quiz.findUnique({
    where: { id: parseInt(id) },
    include: { subject: true, questions: true }
  });
};

export const listQuizzes = async () => {
  return await prisma.quiz.findMany({
    include: { subject: true, questions: true }
  });
};

export const updateQuiz = async (id, { title, subjectId }) => {
  return await prisma.quiz.update({
    where: { id: parseInt(id) },
    data: {
      title,
      subject: subjectId ? { connect: { id: subjectId } } : undefined
    }
  });
};

export const attemptQuiz = async (id, answers, userId) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: parseInt(id) },
    include: { questions: true }
  });
  if (!quiz) throw new Error('Quiz not found');

  let correctCount = 0;
  quiz.questions.forEach((question, index) => {
    // Caso queira trabalhar com as opções, você pode fazer: const options = JSON.parse(question.options);
    if (answers[index] && answers[index] === question.correctAnswer) {
      correctCount++;
    }
  });

  const total = quiz.questions.length;

  // Insere o resultado no banco de dados
  const result = await prisma.result.create({
    data: {
      quizId: quiz.id,
      userId, // usuário que realizou o quiz
      correct: correctCount,
      total: total
    }
  });

  // Retorna o resultado
  return {
    quizId: quiz.id,
    correct: correctCount,
    total,
    incorrect: total - correctCount,
    resultId: result.id
  };
};

export const deleteQuiz = async (id) => {
  return await prisma.quiz.delete({
    where: { id: parseInt(id) }
  });
};

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
