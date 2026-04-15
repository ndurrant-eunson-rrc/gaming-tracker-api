import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import errorHandler from "./api/v1/middleware/errorHandler";
import healthRoutes from "./api/v1/routes/healthRoutes";
import entryRoutes from "./api/v1/routes/entryRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";
import wishlistRoutes from "./api/v1/routes/wishlistRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import { getCorsConfig } from "config/corsConfig";
import { getHelmetConfig } from "config/helmetConfig";
import setupSwagger from "../config/swagger";

const app: Express = express();

app.use(getHelmetConfig());
app.use(getCorsConfig());

app.use(express.json());

setupSwagger(app);

app.use("/api/v1", healthRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/entries", entryRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;