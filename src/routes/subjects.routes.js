import { Router } from "express";
import {
  create,
  get,
  getSubjectById,
  update,
  deleteSubjectById,
} from "../controllers/subjects.controller.js";

const router = Router();

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Criar uma nova matéria
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Matéria criada com sucesso
 */
router.post("/subjects", create);

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Obter todas as matérias
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Lista de matérias retornada com sucesso
 */
router.get("/subjects", get);

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Obter uma matéria específica
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matéria retornada com sucesso
 */
router.get("/subjects/:id", getSubjectById);

/**
 * @swagger
 * /subjects/{id}:
 *   put:
 *     summary: Atualizar uma matéria
 *     tags: [Subjects]
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
 *         description: Matéria atualizada com sucesso
 */
router.put("/subjects/:id", update);

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     summary: Remover uma matéria
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matéria removida com sucesso
 */
router.delete("/subjects/:id", deleteSubjectById);

export default router;
