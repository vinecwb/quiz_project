import {
  create,
  get,
  getId,
  updateUsr,
  deleteUserById,
} from "../controllers/user.controller.js";

const userRoutes = (app) => {
  app.post("/users", create);
  app.get("/users", get);
  app.get("/users/:id", getId);
  app.put("/users/:id", updateUsr);
  app.delete("/users/:id", deleteUserById);
};

export default userRoutes;
