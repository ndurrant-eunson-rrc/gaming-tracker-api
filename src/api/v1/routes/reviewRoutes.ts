import express, { Router } from "express";
import * as reviewController from "./../controllers/reviewController";
// import { validateRequest } from "../middleware/validate";
// import { reviewSchemas } from "../validations/reviewValidation";

const router: Router = express.Router();

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

export default router;