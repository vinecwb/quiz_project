import {
  submitTest,
  getUserResults,
} from "../controllers/testResults.controller.js";

const testResultsRoutes = (app) => {
  app.post("/test-results", submitTest);
  app.get("/test-results/:userId", getUserResults);
};

export default testResultsRoutes;
