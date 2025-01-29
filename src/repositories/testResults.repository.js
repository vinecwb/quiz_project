import { prisma } from "../services/prisma.js";

export const saveTestResult = async (data) => {
  return await prisma.testResult.create({
    data,
  });
};

export const getResultsByUser = async (userId) => {
  return await prisma.testResult.findMany({
    where: { userId },
    include: {
      question: {
        select: { question: true },
      },
    },
  });
};

export const getFilteredResults = async (
  userId,
  minScore,
  startDate,
  endDate
) => {
  return await prisma.testResult.findMany({
    where: {
      userId,
      score: { gte: minScore },
      createdAt: { gte: new Date(startDate), lte: new Date(endDate) },
    },
    include: {
      question: { select: { question: true } },
    },
  });
};
