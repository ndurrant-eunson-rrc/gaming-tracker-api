import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default router;