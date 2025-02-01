import { Router } from "express";
import {
  create,
  get,
  getId,
  updateUsr,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/users", create);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obter todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get("/users", get);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obter um usuário específico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 */
router.get("/users/:id", getId);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Users]
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
 *         description: Usuário atualizado com sucesso
 */
router.put("/users/:id", updateUsr);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remover um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 */
router.delete("/users/:id", deleteUserById);

export default router;
