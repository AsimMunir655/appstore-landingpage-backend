import express from "express";
import {
  countReviewsAndAverage,
  createReview,
  getAllReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

// Public routes
router.post("/set", createReview); // Submit new review

router.get("/get", getAllReviews); // Submit new review

router.get("/count-average-reviews", countReviewsAndAverage); // Submit new review

// Admin routes (add authentication middleware as needed)

export default router;
