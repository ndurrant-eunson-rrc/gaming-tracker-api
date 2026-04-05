import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";
import setupSwagger from "../config/swagger";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

setupSwagger(app);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", healthRoutes);
// app.use("/api/v1/games", gameRoutes);
// app.use("/api/v1/entries", entryRoutes);
// app.use("/api/v1/reviews", reviewRoutes);

export default app;