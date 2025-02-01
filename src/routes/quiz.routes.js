import { Router } from "express";
import { startQuiz, submitQuiz } from "../controllers/quiz.controller.js";

const router = Router();

/**
 * @swagger
 * /quiz/start:
 *   get:
 *     summary: Iniciar um novo quiz
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: Quiz iniciado com sucesso
 */
router.get("/quiz/start", startQuiz);

/**
 * @swagger
 * /quiz/submit:
 *   post:
 *     summary: Enviar respostas do quiz
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Respostas enviadas com sucesso
 */
router.post("/quiz/submit", submitQuiz);

export default router;
