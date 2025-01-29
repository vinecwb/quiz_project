import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import subjectRoutes from "./subjects.routes.js";
import questionRoutes from "./questions.routes.js";
import quizRoutes from "./quiz.routes.js";
import testResultsRoutes from "./testResults.routes.js";

const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(subjectRoutes);
router.use(questionRoutes);
router.use(quizRoutes);
router.use(testResultsRoutes);

export default (app) => {
  app.use(router);
};
