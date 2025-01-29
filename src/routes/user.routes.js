import { Router } from "express";
import {
  create,
  get,
  getId,
  updateUsr,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/users", create);
router.get("/users", get);
router.get("/users/:id", getId);
router.put("/users/:id", updateUsr);
router.delete("/users/:id", deleteUserById);

export default router;
