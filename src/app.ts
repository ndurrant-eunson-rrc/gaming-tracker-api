import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import setupSwagger from "../config/swagger";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

setupSwagger(app);
app.use(helmet());
app.use(cors());
app.use(express.json());



export default app;