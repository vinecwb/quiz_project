import { Router } from "express";
import {
  submitTest,
  getUserResults,
} from "../controllers/testResults.controller.js";
import { authenticateToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /test-results:
 *   post:
 *     summary: Enviar os resultados de um teste
 *     tags: [TestResults]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Resultado do teste salvo com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/test-results", authenticateToken, submitTest);

/**
 * @swagger
 * /test-results/{userId}:
 *   get:
 *     summary: Obter os resultados de um usuário
 *     tags: [TestResults]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resultados do teste retornados com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/test-results/:userId", authenticateToken, getUserResults);

export default router;
