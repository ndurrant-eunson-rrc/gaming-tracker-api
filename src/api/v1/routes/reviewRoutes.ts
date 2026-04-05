import express, { Router } from "express";

const router: Router = express.Router();

router.get("/");
router.get("/:id");
router.post("/");
router.put("/:id");
router.delete("/:id");

export default router;