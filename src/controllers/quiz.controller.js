import { getDecodedToken } from "../helpers/auth.js";

import {
  getRandomQuestions,
  checkAnswers,
  createQuiz,
  getQuizById,
  listQuizzesTeacher,
  listStudentQuizzes,
  updateQuiz,
  deleteQuiz,
  attemptQuiz,
  getTeacherQuizGrades,
  getStudentQuizGrades
} from "../repositories/quiz.repository.js";

export const create = async (req, res) => {
  try {
    // Extrai o payload do token
    const decoded = getDecodedToken(req);
    const teacherId = decoded.id;

    // Verificar se o usuário é um professor, caso necessário
    if (!decoded.isTeacher) {
      return res.status(403).json({ error: 'Apenas professores podem criar quizzes' });
    }

    const { title, subjectId, questions } = req.body;

    if (!title || !subjectId || !questions) {
      return res.status(400).json({ error: 'Campos ausentes' });
    }

    const quiz = await createQuiz({ title, subjectId, teacherId, questions });

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await getQuizById(id);

    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const listTeacher = async (req, res) => {
  try {
    // Extrai o payload do token
    const decoded = getDecodedToken(req);
    const teacherId = decoded.id;

    // Extrai os filtros dos query params
    const { title, subjectId } = req.query;

    // Chama a função que lista os quizzes com os filtros desejados
    const quizzes = await listQuizzesTeacher({ teacherId, title, subjectId });

    res.json(quizzes);
  } catch (error) {
    console.error("Error listing quizzes:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const listStudent = async (req, res) => {
  try {
    // Extrai o payload do token
    const decoded = getDecodedToken(req);
    const userId = decoded.id;

    // Verifica se o usuário é um aluno (não é professor)
    if (decoded.isTeacher) {
      return res.status(403).json({ error: "Este endpoint é exclusivo para alunos." });
    }

    // Extrair filtros de query (por exemplo, title e subjectId)
    const { title, subjectId } = req.query;
    const quizzes = await listStudentQuizzes({ userId, title, subjectId });

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error listing student quizzes:", error);
    // Em caso de erro na extração do token, por exemplo, o erro já terá uma mensagem apropriada.
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subjectId } = req.body;
    const updatedQuiz = await updateQuiz(id, { title, subjectId });

    res.json({ message: 'Quiz updated successfully', quiz: updatedQuiz });

  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteQuiz(id);

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const attempt = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, userId } = req.body;

    if (!answers || !userId) {
      return res.status(400).json({ error: 'Answers and userId are required' });
    }

    const result = await attemptQuiz(id, answers, userId);

    res.json({ message: 'Quiz attempted successfully', result });
  } catch (error) {
    console.error("Error attempting quiz:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const startQuiz = async (req, res) => {
  try {
    const questions = await getRandomQuestions();

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to load questions" });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    const score = await checkAnswers(answers);

    res.status(200).json({ score, message: `Your score is ${score}/10` });
  } catch (error) {
    res.status(500).json({ error: "Failed to evaluate quiz" });
  }
};

export const listQuizGrades = async (req, res) => {
  try {
    // Extrai e verifica o token para obter os dados do usuário
    const decoded = getDecodedToken(req);
    const userId = decoded.id;

    // Se o usuário for professor, aplica os filtros para listar os quizzes criados por ele
    if (decoded.isTeacher) {
      const { quizName, subject, student } = req.query;
      const teacherResults = await getTeacherQuizGrades({
        teacherId: userId,
        quizName,
        subject,
        student
      });
      return res.status(200).json(teacherResults);
    } else {
      // Se não for professor, trata como aluno: lista todos os quizzes respondidos por ele
      const studentResults = await getStudentQuizGrades(userId);
      return res.status(200).json(studentResults);
    }
  } catch (error) {
    console.error("Error listing quiz grades:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};