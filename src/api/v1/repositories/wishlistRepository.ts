import * as firestoreRepository from "./firestoreRepository";
import { Wishlist } from "../models/wishlistModel";

const COLLECTION = "wishlist";

/**
 * Creates a new wishlist item in Firestore
 * @param data - Wishlist item data
 * @returns The ID of the created document
 */
export const createWishlistItem = async (data: Partial<Wishlist>): Promise<string> => {
  return firestoreRepository.createDocument<Wishlist>(COLLECTION, data);
};

/**
 * Retrieves all wishlist items from Firestore
 * @returns QuerySnapshot of all wishlist items
 */
export const getAllWishlistItems = async (): Promise<FirebaseFirestore.QuerySnapshot> => {
  return firestoreRepository.getDocuments(COLLECTION);
};

/**
 * Retrieves a single wishlist item by ID
 * @param id - Wishlist item document ID
 * @returns DocumentSnapshot or null
 */
export const getWishlistItemById = async (
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
  return firestoreRepository.getDocumentById(COLLECTION, id);
};

/**
 * Updates an existing wishlist item
 * @param id - Wishlist item document ID
 * @param data - Fields to update
 */
export const updateWishlistItem = async (id: string, data: Partial<Wishlist>): Promise<void> => {
  return firestoreRepository.updateDocument<Wishlist>(COLLECTION, id, data);
};

/**
 * Deletes a wishlist item by ID
 * @param id - Wishlist item document ID
 */
export const deleteWishlistItem = async (id: string): Promise<void> => {
  return firestoreRepository.deleteDocument(COLLECTION, id);
};