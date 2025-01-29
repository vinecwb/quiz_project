import { Router } from "express";
import {
  create,
  getAllQuestions,
  getSubjectById,
  update,
  deleteSubjectById,
} from "../controllers/subjects.controller.js";

const router = Router();

router.post("/subjects", create);
router.get("/subjects", getAllQuestions);
router.get("/subjects/:id", getSubjectById);
router.put("/subjects/:id", update);
router.delete("/subjects/:id", deleteSubjectById);

export default router;
