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

router.post("/questions", create);
router.get("/questions", getAll);
router.get("/questions/:id", getById);
router.get("/questions/subject/:subjectId", getBySubjectId);
router.put("/questions/:id", update);
router.delete("/questions/:id", remove);

export default router;
