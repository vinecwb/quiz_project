import {
  create,
  update,
  remove,
  getAll,
  getById,
  getBySubjectId,
} from "../controllers/questions.controller.js";

const questionRoutes = (app) => {
  app.post("/questions", create);
  app.get("/questions", getAll);
  app.get("/questions/:id", getById);
  app.get("/questions/subject/:subjectId", getBySubjectId);
  app.put("/questions/:id", update);

  app.delete("/questions/:id", remove);
};

export default questionRoutes;
