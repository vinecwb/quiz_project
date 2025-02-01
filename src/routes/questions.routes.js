import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  getBySubjectId,
} from "../controllers/questions.controller.js";

const router = Router();

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Criar uma nova questão
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Questão criada com sucesso
 */
router.post("/questions", create);

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Obter todas as questões
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Lista de questões retornada com sucesso
 */
router.get("/questions", getAll);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Obter uma questão específica
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Questão retornada com sucesso
 */
router.get("/questions/:id", getById);

/**
 * @swagger
 * /questions/subject/{subjectId}:
 *   get:
 *     summary: Obter questões por matéria
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de questões retornada com sucesso
 */
router.get("/questions/subject/:subjectId", getBySubjectId);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Atualizar uma questão
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Questão atualizada com sucesso
 */
router.put("/questions/:id", update);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Remover uma questão
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Questão removida com sucesso
 */
router.delete("/questions/:id", remove);

export default router;
