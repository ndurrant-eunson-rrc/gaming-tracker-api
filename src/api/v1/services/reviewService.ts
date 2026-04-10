import * as reviewRepository from "../repositories/reviewRepository";
import { Review } from "../models/reviewModel";
import { ServiceError } from "../errors/errors";
import { Timestamp } from "firebase-admin/firestore";

/**
 * Converts a Firestore Timestamp or Date to an ISO string
 * @param value - Timestamp or Date object
 * @returns ISO date string
 */
const toISOString = (value: Timestamp | Date): string => {
  if (value instanceof Date) return value.toISOString();
  return value.toDate().toISOString();
};

/**
 * Retrieves all reviews
 * @returns Array of all reviews
 */
export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const snapshot = await reviewRepository.getAllReviews();
    return snapshot.docs
      .filter((doc) => doc.data() !== undefined)
      .map((doc) => {
        const data = doc.data()!;
        return {
          ...data,
          id: doc.id,
          createdAt: toISOString(data.createdAt),
          updatedAt: toISOString(data.updatedAt),
        } as unknown as Review;
      });
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

  const data = doc.data();
  if (!data) throw new ServiceError("Review data is missing", "REVIEW_DATA_MISSING", 404);

  return {
    ...data,
    id: doc.id,
    createdAt: toISOString(data.createdAt),
    updatedAt: toISOString(data.updatedAt),
  } as unknown as Review;
};

/**
 * Creates a new review
 * @param data - Review fields from request body
 * @returns The ID of the created review
 */
export const createReview = async (
  data: Pick<Review, "gameTitle" | "score" | "review">
): Promise<string> => {
  const now = new Date();
  const review: Partial<Review> = { ...data, createdAt: now, updatedAt: now };
  return reviewRepository.createReview(review);
};

/**
 * Updates an existing review and returns the updated review
 * @param id - Review document ID
 * @param data - Fields to update
 * @returns The updated review object
 */
export const updateReview = async (
  id: string,
  data: Partial<Pick<Review, "gameTitle" | "score" | "review">>
): Promise<Review> => {
  const existing = await reviewRepository.getReviewById(id);
  if (!existing) throw new ServiceError("Review not found", "REVIEW_NOT_FOUND", 404);

  await reviewRepository.updateReview(id, { ...data, updatedAt: new Date() });

  const updated = await reviewRepository.getReviewById(id);
  if (!updated) throw new ServiceError("Review not found after update", "REVIEW_NOT_FOUND", 404);

  const updatedData = updated.data();
  if (!updatedData) throw new ServiceError("Review data is missing", "REVIEW_DATA_MISSING", 404);

  return {
    ...updatedData,
    id: updated.id,
    createdAt: toISOString(updatedData.createdAt),
    updatedAt: toISOString(updatedData.updatedAt),
  } as unknown as Review;
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