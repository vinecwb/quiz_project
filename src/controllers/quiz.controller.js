import {
  getRandomQuestions,
  checkAnswers,
  createQuiz,
  getQuizById,
    listQuizzes,
    updateQuiz,
    deleteQuiz,
    attemptQuiz
} from "../repositories/quiz.repository.js";

export const create = async (req, res) => {
  try {
    const { title, subjectId, questions } = req.body;

    if (!title || !subjectId || !questions) {
      return res.status(400).json({ error: 'Campos ausentes' });
    }

    const quiz = await createQuiz({ title, subjectId, questions });

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

export const list = async (req, res) => {
  try {
    const quizzes = await listQuizzes();

    res.json(quizzes);
  } catch (error) {
    console.error("Error listing quizzes:", error);
    res.status(500).json({ error: 'Internal server error' });
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
