import { startQuiz, submitQuiz } from "../controllers/quiz.controller.js";

const quizRoutes = (app) => {
  app.get("/quiz/start", startQuiz);
  app.post("/quiz/submit", submitQuiz);
};

export default quizRoutes;
