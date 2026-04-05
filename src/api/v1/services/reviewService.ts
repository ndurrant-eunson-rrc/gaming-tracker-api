import * as reviewRepository from "../repositories/reviewRepository";
import { Review } from "../models/reviewModel";
import { ServiceError } from "../errors/errors";

/**
 * Retrieves all reviews
 * @returns Array of all reviews
 */
export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const snapshot = await reviewRepository.getAllReviews();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review));
  } catch (error) {
    throw new ServiceError("Failed to retrieve reviews", "GET_REVIEWS_FAILED");
  }
};

/**
 * Retrieves a single review by ID
 * @param id - Review document ID
 * @returns The review object
 */
export const getReviewById = async (id: string): Promise<Review> => {
  const doc = await reviewRepository.getReviewById(id);
  if (!doc) throw new ServiceError("Review not found", "REVIEW_NOT_FOUND", 404);
  return { id: doc.id, ...doc.data() } as Review;
};

/**
 * Creates a new review
 * @param data - Review fields from request body
 * @returns The ID of the created review
 */
export const createReview = async (
  data: Pick<Review, "gameTitle" | "score" | "body">
): Promise<string> => {
  const now = new Date();
  const review: Partial<Review> = { ...data, createdAt: now, updatedAt: now };
  return reviewRepository.createReview(review);
};

/**
 * Updates an existing review
 * @param id - Review document ID
 * @param data - Fields to update
 */
export const updateReview = async (
  id: string,
  data: Partial<Pick<Review, "gameTitle" | "score" | "body">>
): Promise<void> => {
  const existing = await reviewRepository.getReviewById(id);
  if (!existing) throw new ServiceError("Review not found", "REVIEW_NOT_FOUND", 404);
  await reviewRepository.updateReview(id, { ...data, updatedAt: new Date() });
};

/**
 * Deletes a review by ID
 * @param id - Review document ID
 */
export const deleteReview = async (id: string): Promise<void> => {
  const existing = await reviewRepository.getReviewById(id);
  if (!existing) throw new ServiceError("Review not found", "REVIEW_NOT_FOUND", 404);
  await reviewRepository.deleteReview(id);
};