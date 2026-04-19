import * as reviewRepository from "../repositories/reviewRepository";
import { Review } from "../models/reviewModel";
import { ServiceError } from "../errors/errors";
import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../../../../config/firebaseConfig";
import { sendReviewEmail } from "./emailService";

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
 * Maps a Firestore document to a Review object
 * @param doc - Firestore document snapshot
 * @returns Review object
 */
const mapDocToReview = (doc: FirebaseFirestore.DocumentSnapshot): Review => {
	const data = doc.data()!;
	return {
		...data,
		id: doc.id,
		createdAt: toISOString(data.createdAt),
		updatedAt: toISOString(data.updatedAt),
	} as unknown as Review;
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
			.map(mapDocToReview);
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

	return mapDocToReview(doc);
};

/**
 * Creates a new review and sends a confirmation email
 * @param data - Review fields from request body
 * @param uid - The authenticated user's UID
 * @returns The created review object
 */
export const createReview = async (
	data: Pick<Review, "gameTitle" | "score" | "review">,
	uid?: string
): Promise<Review> => {
	const now = new Date();
	const review: Partial<Review> = { ...data, createdAt: now, updatedAt: now };
	const id = await reviewRepository.createReview(review);

	// Send review confirmation email
	if (uid) {
		try {
			const userRecord = await auth.getUser(uid);
			const userEmail = userRecord.email;
			if (userEmail) {
				await sendReviewEmail(userEmail, data.gameTitle, data.score);
			}
		} catch (error) {
			console.error("Failed to send review email:", error);
		}
	}

	const created = await reviewRepository.getReviewById(id);
	if (!created) throw new ServiceError("Review not found after creation", "REVIEW_NOT_FOUND", 404);

	return mapDocToReview(created);
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

	return mapDocToReview(updated);
};

/**
 * Deletes a review by ID and returns the deleted review
 * @param id - Review document ID
 * @returns The deleted review object
 */
export const deleteReview = async (id: string): Promise<Review> => {
	const existing = await reviewRepository.getReviewById(id);
	if (!existing) throw new ServiceError("Review not found", "REVIEW_NOT_FOUND", 404);

	const deletedReview = mapDocToReview(existing);
	await reviewRepository.deleteReview(id);
	return deletedReview;
};