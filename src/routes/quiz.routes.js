import { Router } from "express";
import { create, listTeacher, listStudent, getQuiz, update, remove, attempt, listQuizGrades } from "../controllers/quiz.controller.js";

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
 *     security:
 *        - bearerAuth: []
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
 *       403:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/quiz', create);

/**
 * @swagger
 * /quiz/teacher:
 *   get:
 *     summary: Lista todos os quizzes do professor
 *     tags: [Quizzes]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *         - in: query
 *           name: title
 *           schema:
 *             type: string
 *           description: Filtro opcional para o título do quiz.
 *         - in: query
 *           name: subjectId
 *           schema:
 *             type: integer
 *           description: Filtro opcional para o ID da matéria.
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
router.get('/quiz/teacher', listTeacher);

/**
 * @swagger
 * /quiz/student:
 *   get:
 *     summary: Lista todos os quizzes para os alunos
 *     tags: [Quizzes]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *         - in: query
 *           name: title
 *           schema:
 *             type: string
 *           description: Filtro opcional para o título do quiz.
 *         - in: query
 *           name: subjectId
 *           schema:
 *             type: integer
 *           description: Filtro opcional para o ID da matéria.
 *     responses:
 *       200:
 *         description: Lista de quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuizStudent'
 */
router.get('/quiz/student', listStudent);

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
 * /quiz/{id}:
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
 * /quiz/{id}:
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
 * /quiz/{id}/attempt:
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
 *                 example:
 *                    "0": "respostaA"
 *                    "1": "respostaC"
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
 *                   $ref: '#/components/schemas/Result'
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/quiz/:id/attempt', attempt);

/**
 * @swagger
 * /quiz/grades:
 *   get:
 *     summary: Lista notas dos quizzes
 *     description: >
 *       Se o usuário for professor, retorna uma lista com o nome do quiz, matéria, nome do aluno e a nota,
 *       permitindo filtrar por quizName, subject e student.
 *       Se o usuário for aluno, retorna todos os quizzes respondidos por ele com suas respectivas notas.
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: quizName
 *         schema:
 *           type: string
 *         description: Filtro opcional para o nome do quiz (apenas para professores).
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filtro opcional para o nome da matéria (apenas para professores).
 *       - in: query
 *         name: student
 *         schema:
 *           type: string
 *         description: Filtro opcional para o nome do aluno (apenas para professores).
 *     responses:
 *       200:
 *         description: Lista de notas dos quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quizTitle:
 *                     type: string
 *                   subject:
 *                     type: string
 *                   studentName:
 *                     type: string
 *                   grade:
 *                     type: object
 *                     properties:
 *                       correct:
 *                         type: integer
 *                       total:
 *                         type: integer
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/quiz/grades', listQuizGrades);

export default router;
