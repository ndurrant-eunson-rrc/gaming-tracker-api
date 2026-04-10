import * as wishlistRepository from "../repositories/wishlistRepository";
import { Wishlist } from "../models/wishlistModel";
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
 * Retrieves all wishlist items
 * @returns Array of all wishlist items
 */
export const getAllWishlistItems = async (): Promise<Wishlist[]> => {
  try {
    const snapshot = await wishlistRepository.getAllWishlistItems();
    return snapshot.docs
      .filter((doc) => doc.data() !== undefined)
      .map((doc) => {
        const data = doc.data()!;
        return {
          ...data,
          id: doc.id,
          addedAt: toISOString(data.addedAt),
          updatedAt: toISOString(data.updatedAt),
        } as unknown as Wishlist;
      });
  } catch (error) {
    throw new ServiceError("Failed to retrieve wishlist items", "GET_WISHLIST_FAILED");
  }
};

/**
 * Retrieves a single wishlist item by ID
 * @param id - Wishlist item document ID
 * @returns The wishlist item object
 */
export const getWishlistItemById = async (id: string): Promise<Wishlist> => {
  const doc = await wishlistRepository.getWishlistItemById(id);
  if (!doc) throw new ServiceError("Wishlist item not found", "WISHLIST_ITEM_NOT_FOUND", 404);

  const data = doc.data();
  if (!data) throw new ServiceError("Wishlist item data is missing", "WISHLIST_DATA_MISSING", 404);

  return {
    ...data,
    id: doc.id,
    addedAt: toISOString(data.addedAt),
    updatedAt: toISOString(data.updatedAt),
  } as unknown as Wishlist;
};

/**
 * Creates a new wishlist item
 * @param data - Wishlist item fields from request body
 * @returns The ID of the created wishlist item
 */
export const createWishlistItem = async (
  data: Pick<Wishlist, "gameTitle" | "priority"> & Partial<Pick<Wishlist, "notes">>
): Promise<string> => {
  const now = new Date();
  const item: Partial<Wishlist> = { ...data, addedAt: now, updatedAt: now };
  return wishlistRepository.createWishlistItem(item);
};

/**
 * Updates an existing wishlist item and returns the updated item
 * @param id - Wishlist item document ID
 * @param data - Fields to update
 * @returns The updated wishlist item object
 */
export const updateWishlistItem = async (
  id: string,
  data: Partial<Pick<Wishlist, "gameTitle" | "priority" | "notes">>
): Promise<Wishlist> => {
  const existing = await wishlistRepository.getWishlistItemById(id);
  if (!existing) throw new ServiceError("Wishlist item not found", "WISHLIST_ITEM_NOT_FOUND", 404);

  await wishlistRepository.updateWishlistItem(id, { ...data, updatedAt: new Date() });

  const updated = await wishlistRepository.getWishlistItemById(id);
  if (!updated) throw new ServiceError("Wishlist item not found after update", "WISHLIST_ITEM_NOT_FOUND", 404);

  const updatedData = updated.data();
  if (!updatedData) throw new ServiceError("Wishlist item data is missing", "WISHLIST_DATA_MISSING", 404);

  return {
    ...updatedData,
    id: updated.id,
    addedAt: toISOString(updatedData.addedAt),
    updatedAt: toISOString(updatedData.updatedAt),
  } as unknown as Wishlist;
};

/**
 * Deletes a wishlist item by ID
 * @param id - Wishlist item document ID
 */
export const deleteWishlistItem = async (id: string): Promise<void> => {
  const existing = await wishlistRepository.getWishlistItemById(id);
  if (!existing) throw new ServiceError("Wishlist item not found", "WISHLIST_ITEM_NOT_FOUND", 404);
  await wishlistRepository.deleteWishlistItem(id);
};