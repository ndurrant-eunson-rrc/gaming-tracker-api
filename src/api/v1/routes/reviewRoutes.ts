import express, { Router } from "express";
import * as reviewController from "./../controllers/reviewController";
import { validateRequest } from "../middleware/validate";
import { reviewSchemas } from "../validation/reviewSchemas";

const router: Router = express.Router();

router.get("/", validateRequest(reviewSchemas.create), reviewController.getAllReviews);
router.get("/:id", validateRequest(reviewSchemas.getById), reviewController.getReviewById);
router.post("/", validateRequest(reviewSchemas.create), reviewController.createReview);
router.put("/:id", validateRequest(reviewSchemas.update), reviewController.updateReview);
router.delete("/:id", validateRequest(reviewSchemas.delete), reviewController.deleteReview);

export default router;