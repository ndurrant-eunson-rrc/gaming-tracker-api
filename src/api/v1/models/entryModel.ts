export type EntryStatus = "want_to_play" | "playing" | "completed";

export interface BacklogEntry {
  id: string;
  userId: string;
  gameId: string;
  status: EntryStatus;
  rating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}