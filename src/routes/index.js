import userRoutes from "./user.routes.js";
import subjectRoutes from "./subjects.routes.js";
import questionRoutes from "./questions.routes.js";

const routes = (app) => {
  userRoutes(app);
  subjectRoutes(app);
  questionRoutes(app);
};

export default routes;
