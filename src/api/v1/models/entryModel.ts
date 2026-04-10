/**
 * Valid statuses for a backlog entry
 */
export type EntryStatus = "want_to_play" | "playing" | "completed";

/**
 * Represents a user's backlog entry.
 * Game information is entered directly by the user.
 */
export interface BacklogEntry {
  id: string; // username
  title: string; // required title of the entry
  genre: string; // what genre the game falls under
  platform: string; // console (e.g., PS5, Steam, Switch)
  franchise?: string; // optional, in case it's an indie game (e.g., Final Fantasy, Zelda)
  status: EntryStatus; // want_to_play, playing, or completed
  rating?: number; // optional, user rating out of 10 or more if they want
  notes?: string; // optional, any additional notes the user wants to add
  createdAt: Date | string; // timestamp of when the entry was created
  updatedAt: Date | string; // timestamp of the last update to the entry
}