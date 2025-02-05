import { prisma } from "../services/prisma.js";

export const createQuiz = async ({ title, subjectId, teacherId, questions }) => {
  const quiz = await prisma.quiz.create({
    data: {
      title,
      subject: { connect: { id: subjectId } },
      user: { connect: { id: teacherId }},
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

export const listQuizzesTeacher = async ({ teacherId, title, subjectId }) => {
  // Cria um objeto de filtro para a consulta
  const filter = {
    teacherId: teacherId, // Filtra pelo professor autenticado
  };

  if (title) {
    // Busca por título de forma parcial (insensível a maiúsculas/minúsculas)
    filter.title = { contains: title, mode: 'insensitive' };
  }

  if (subjectId) {
    // Converte subjectId para número e filtra
    filter.subjectId = Number(subjectId);
  }

  // Consulta os quizzes no banco de dados, incluindo as relações com subject e questions
  return await prisma.quiz.findMany({
    where: filter,
    include: { subject: true, questions: true }
  });
};

export const listStudentQuizzes = async ({ userId, title, subjectId }) => {
  const filter = {};

  if (title) {
    filter.title = { contains: title, mode: 'insensitive' };
  }
  if (subjectId) {
    filter.subjectId = Number(subjectId);
  }

  // Consulta todos os quizzes (com filtros, se informados)
  const quizzes = await prisma.quiz.findMany({
    where: filter,
    include: {
      subject: true
    }
  });

  // Obter os IDs dos quizzes
  const quizIds = quizzes.map(q => q.id);

  // Buscar em lote os resultados para o usuário
  const results = await prisma.result.findMany({
    where: {
      quizId: { in: quizIds },
      userId: userId
    }
  });

  // Criar um mapa para verificar rapidamente se o quiz foi resolvido
  const resultsMap = results.reduce((acc, result) => {
    acc[result.quizId] = result;
    return acc;
  }, {});

  // Adicionar a propriedade 'solved' em cada quiz
  return quizzes.map(quiz => ({
    ...quiz,
    solved: Boolean(resultsMap[quiz.id])
  }));
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

export const getTeacherQuizGrades = async ({ teacherId, quizName, subject, student }) => {
  // Monta o filtro para os quizzes do professor
  let quizFilter = { teacherId };

  if (quizName) {
    quizFilter.title = { contains: quizName, mode: 'insensitive' };
  }

  if (subject) {
    // Filtra pelo nome da matéria (usando a relação com Subject)
    quizFilter.subject = { name: { contains: subject, mode: 'insensitive' } };
  }

  // Monta o filtro para os resultados (filtrando pelo nome do aluno, se informado)
  let resultsFilter = {};
  if (student) {
    resultsFilter = {
      user: { name: { contains: student, mode: 'insensitive' } }
    };
  }

  // Consulta os quizzes com os filtros e inclui a matéria e os resultados com os dados do usuário
  const quizzes = await prisma.quiz.findMany({
    where: quizFilter,
    include: {
      subject: true,
      results: {
        where: resultsFilter,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    }
  });

  // Mapeia os dados para retornar uma lista de objetos com os campos desejados:
  // { quizTitle, subject, studentName, grade }
  const teacherResults = [];
  quizzes.forEach(quiz => {
    const quizTitle = quiz.title;
    const subjectName = quiz.subject.name;
    quiz.results.forEach(result => {
      teacherResults.push({
        quizTitle,
        subject: subjectName,
        studentName: result.user.name,
        grade: {
          correct: result.correct,
          total: result.total
        }
      });
    });
  });

  return teacherResults;
};

export const getStudentQuizGrades = async (studentId) => {
  // Consulta os resultados onde o aluno (userId) respondeu o quiz
  const results = await prisma.result.findMany({
    where: { userId: studentId },
    include: {
      quiz: {
        include: {
          subject: true
        }
      }
    }
  });

  // Mapeia os resultados para retornar { quizTitle, subject, grade }
  return results.map(result => ({
    quizTitle: result.quiz.title,
    subject: result.quiz.subject.name,
    grade: {
      correct: result.correct,
      total: result.total
    }
  }));
};