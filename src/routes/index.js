import userRoutes from "./user.routes.js";
import subjectRoutes from "./subjects.routes.js";
import questionRoutes from "./questions.routes.js";
import quizRoutes from "./quiz.routes.js";
import testResultsRoutes from "./testResults.routes.js";

const routes = (app) => {
  userRoutes(app);
  subjectRoutes(app);
  questionRoutes(app);
  quizRoutes(app);
  testResultsRoutes(app);
};

export default routes;
