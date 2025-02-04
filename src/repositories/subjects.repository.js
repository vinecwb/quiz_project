import { prisma } from "../services/prisma.js";

export const createSubject = async (data) => {
  const subject = await prisma.subject.create({
    data: {
      name: data.name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return subject;
};

export const getAll = async () => {
  const subjects = await prisma.subject.findMany({
    select: {
      id: true,
      name: true
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
    },
    select: {
      id: true,
      name: true,
    },
  });

  return subject;
};

export const deleteSubject = async (id) => {
  await prisma.subject.delete({
    where: { id },
  });
};
