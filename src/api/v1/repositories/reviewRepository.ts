import * as firestoreRepository from "./firestoreRepository";
import { Review } from "../models/reviewModel";

const COLLECTION = "reviews";

/**
 * Creates a new review in Firestore
 * @param data - Review data
 * @returns The ID of the created document
 */
export const createReview = async (data: Partial<Review>): Promise<string> => {
	return firestoreRepository.createDocument<Review>(COLLECTION, data);
};

/**
 * Retrieves all reviews
 * @returns QuerySnapshot of all reviews
 */
export const getAllReviews = async (): Promise<FirebaseFirestore.QuerySnapshot> => {
	return firestoreRepository.getDocuments(COLLECTION);
};

/**
 * Retrieves a single review by ID
 * @param id - Review document ID
 * @returns DocumentSnapshot or null
 */
export const getReviewById = async (
	id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
	return firestoreRepository.getDocumentById(COLLECTION, id);
};

/**
 * Updates an existing review
 * @param id - Review document ID
 * @param data - Fields to update
 */
export const updateReview = async (id: string, data: Partial<Review>): Promise<void> => {
	return firestoreRepository.updateDocument<Review>(COLLECTION, id, data);
};

/**
 * Deletes a review by ID
 * @param id - Review document ID
 */
export const deleteReview = async (id: string): Promise<void> => {
	return firestoreRepository.deleteDocument(COLLECTION, id);
};