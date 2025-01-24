import {
  create,
  getAllQuestions,
  getSubjectById,
  update,
  deleteSubjectById,
} from "../controllers/subjects.controller.js";

const subjectRoutes = (app) => {
  app.post("/subjects", create);
  app.get("/subjects", getAllQuestions);
  app.get("/subjects/:id", getSubjectById);
  app.put("/subjects/:id", update);
  app.delete("/subjects/:id", deleteSubjectById);
};

export default subjectRoutes;
