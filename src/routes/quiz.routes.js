import { Router } from "express";
import { create, list, getQuiz, update, remove, attempt } from "../controllers/quiz.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Endpoints para gerenciamento de quizzes
 */


/**
 * @swagger
 * /quiz:
 *   post:
 *     summary: Cria um novo quiz
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subjectId
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *               subjectId:
 *                 type: integer
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     correctAnswer:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Quiz criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 quiz:
 *                   $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/quiz', create);

/**
 * @swagger
 * /quiz:
 *   get:
 *     summary: Lista todos os quizzes
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: Lista de quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quiz'
 */
router.get('/quiz', list);

/**
 * @swagger
 * /quiz/{id}:
 *   get:
 *     summary: Retorna os detalhes de um quiz pelo ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do quiz
 *     responses:
 *       200:
 *         description: Detalhes do quiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: Quiz não encontrado
 */
router.get('/quiz/:id', getQuiz);

/**
 * @swagger
 * /api/quiz/{id}:
 *   put:
 *     summary: Atualiza os dados básicos de um quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do quiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subjectId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quiz atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 quiz:
 *                   $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Erro interno no servidor
 */
router.put('/quiz/:id', update);

/**
 * @swagger
 * /api/quiz/{id}:
 *   delete:
 *     summary: Remove um quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do quiz
 *     responses:
 *       200:
 *         description: Quiz removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno no servidor
 */
router.delete('/quiz/:id', remove);

/**
 * @swagger
 * /api/quiz/{id}/attempt:
 *   post:
 *     summary: Realiza a tentativa de um quiz e insere o resultado
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do quiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *               - userId
 *             properties:
 *               answers:
 *                 type: object
 *                 description: Objeto com as respostas, onde as chaves são os índices das perguntas
 *               userId:
 *                 type: integer
 *                 description: ID do usuário que realizou o quiz
 *     responses:
 *       200:
 *         description: Resultado da tentativa do quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/quiz/:id/attempt', attempt);

export default router;
