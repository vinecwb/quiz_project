import { prisma } from "../services/prisma.js";

export const createQuestion = async (data) => {
  const question = await prisma.question.create({
    data,
    select: {
      id: true,
      question: true,
      options: true,
      answer: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return question;
};

export const getAllQuestions = async () => {
  const questions = await prisma.question.findMany({
    include: {
      subject: true,
    },
  });

  return questions;
};

export const getQuestionById = async (id) => {
  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      subject: true,
    },
  });

  return question;
};

export const getQuestionsBySubjectId = async (subjectId) => {
  const questions = await prisma.question.findMany({
    where: { subjectId },
    include: {
      subject: true,
    },
  });

  return questions;
};

export const updateQuestion = async (id, data) => {
  const question = await prisma.question.update({
    where: { id },
    data,
    select: {
      id: true,
      question: true,
      options: true,
      answer: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return question;
};

export const deleteQuestion = async (id) => {
  const question = await prisma.question.delete({
    where: { id },
    select: {
      id: true,
      question: true,
    },
  });

  return question;
};
