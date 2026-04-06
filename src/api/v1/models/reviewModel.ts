/**
 * Represents a user's review for a game
 */
export interface Review {
  id: string; //
  gameTitle: string; // 
  score: number; // e.g., 8.5 out of 10
  review: string; // user's written review
  createdAt: Date | String; // when the review was created
  updatedAt: Date | String; // when the review was last updated
}