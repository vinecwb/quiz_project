import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "../src/routes/index.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

routes(app);

app.listen(3001);
console.log("Server running on port 3001");
