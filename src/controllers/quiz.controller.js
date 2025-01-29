import {
  getRandomQuestions,
  checkAnswers,
} from "../repositories/quiz.repository.js";

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
