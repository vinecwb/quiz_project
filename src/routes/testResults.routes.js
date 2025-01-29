import { Router } from "express";
import {
  submitTest,
  getUserResults,
} from "../controllers/testResults.controller.js";
import { authenticateToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/test-results", authenticateToken, submitTest);
router.get("/test-results/:userId", authenticateToken, getUserResults);

export default router;
