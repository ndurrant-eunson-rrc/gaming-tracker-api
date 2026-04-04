export interface Review {
  id: string;
  userId: string;
  gameId: string;
  score: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}