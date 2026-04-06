/**
 * Valid wishlist priorities
 */
export type EntryStatus = "low" | "medium" | "high";

/**
 * Represents a user's wishlist item for a game
 */
export interface Wishlist {
  id: string; // firestore id
  userId: string; // user id
  gameTitle: string; // game title
  priority: EntryStatus; // user decides the priority
  notes?: string; // any notes the user wants to include
  addedAt: Date | String; // when the game was added to the wishlist
  updatedAt: Date | String; // when the wishlist item was last updated
}