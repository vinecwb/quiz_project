import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsBySubjectId,
} from "../repositories/questions.repository.js";
import { questionSchema } from "../validators/question.validator.js";

export const create = async (req, res) => {
  try {
    questionSchema.parse(req.body);
    const question = await createQuestion(req.body);
    res.status(201).send(question);
  } catch (error) {
    console.error("Error creating question:", error);
    res
      .status(400)
      .send({ error: "Failed to create question", details: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const questions = await getAllQuestions();
    res.status(200).send(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res
      .status(400)
      .send({ error: "Failed to fetch questions", details: error.message });
  }
};

// Controller para buscar uma questão por ID
export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await getQuestionById(Number(id));
    if (!question) {
      return res.status(404).send({ error: "Question not found" });
    }
    res.status(200).send(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res
      .status(400)
      .send({ error: "Failed to fetch question", details: error.message });
  }
};

export const getBySubjectId = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const questions = await getQuestionsBySubjectId(Number(subjectId));
    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .send({ error: "No questions found for this subject" });
    }
    res.status(200).send(questions);
  } catch (error) {
    console.error("Error fetching questions by subject:", error);
    res.status(400).send({
      error: "Failed to fetch questions by subject",
      details: error.message,
    });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { question, options, answer } = req.body;

  try {
    const updatedQuestion = await updateQuestion(Number(id), {
      question,
      options,
      answer,
    });
    res.status(200).send(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    res
      .status(400)
      .send({ error: "Failed to update question", details: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await deleteQuestion(Number(id));
    res
      .status(200)
      .send({ message: "Question deleted successfully", deletedQuestion });
  } catch (error) {
    console.error("Error deleting question:", error);
    res
      .status(400)
      .send({ error: "Failed to delete question", details: error.message });
  }
};
