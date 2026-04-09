/**
 * Valid wishlist priorities
 */
export type WishlistPriority = "low" | "medium" | "high";

/**
 * Represents a user's wishlist item for a game
 */
export interface Wishlist {
  id: string; // firestore id
  userId: string; // id of the user who owns this wishlist item
  gameTitle: string; // game title
  priority: WishlistPriority; // user decides the priority
  notes?: string; // any notes the user wants to include
  addedAt: Date | String; // when the game was added to the wishlist
  updatedAt: Date | String; // when the wishlist item was last updated
}