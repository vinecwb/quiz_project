import { Router } from "express";
import { startQuiz, submitQuiz } from "../controllers/quiz.controller.js";

const router = Router();

router.get("/quiz/start", startQuiz);
router.post("/quiz/submit", submitQuiz);

export default router;
