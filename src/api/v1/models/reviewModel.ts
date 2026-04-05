/**
 * Represents a user's review for a game
 */
export interface Review {
  id: string;
  gameTitle: string;
  score: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}