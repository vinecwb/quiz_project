import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "../src/routes/index.js";
import setupSwagger from "./swagger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

setupSwagger(app);
routes(app);

const PORT = process.env.PORT || 3001;
let server = null;

if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app, server };
