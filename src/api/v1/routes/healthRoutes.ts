import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check server health status
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                 timestamp:
 *                   type: string
 *                 version:
 *                   type: string
 */
router.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default router;