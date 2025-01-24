import { prisma } from "../services/prisma.js";

export const createSubject = async (data) => {
  const subject = await prisma.subject.create({
    data: {
      name: data.name,
      questions: {
        create: data.questions,
      },
    },
    select: {
      name: true,
      questions: true,
    },
  });

  return subject;
};

export const getAll = async () => {
  const subjects = await prisma.subject.findMany({
    select: {
      id: true,
      name: true,
      questions: true,
    },
  });
  return subjects;
};

export const getById = async (id) => {
  const subject = await prisma.subject.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
  return subject;
};

export const updateSubject = async (id, data) => {
  const subject = await prisma.subject.update({
    where: { id }, // Encontrar o subject pelo id
    data: {
      name: data.name, // Atualiza o nome do subject
      questions: {
        // Atualiza as questões associadas
        upsert: data.questions.map((question) => ({
          where: { id: question.id || -1 }, // Verifica se a questão já existe
          update: {
            question: question.question,
            options: question.options,
            answer: question.answer,
          },
          create: {
            question: question.question,
            options: question.options,
            answer: question.answer,
          },
        })),
      },
    },
    select: {
      id: true,
      name: true,
      questions: true,
    },
  });

  return subject;
};

export const deleteSubject = async (id) => {
  await prisma.subject.delete({
    where: { id },
  });
};
