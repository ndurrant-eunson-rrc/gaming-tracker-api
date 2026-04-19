import * as entryRepository from "../repositories/entryRepository";
import { BacklogEntry } from "../models/entryModel";
import { ServiceError } from "../errors/errors";
import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../../../../config/firebaseConfig";
import { sendCompletionEmail } from "./emailService";

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
 * Maps a Firestore document to a BacklogEntry object
 * @param doc - Firestore document snapshot
 * @returns BacklogEntry object
 */
const mapDocToEntry = (doc: FirebaseFirestore.DocumentSnapshot): BacklogEntry => {
  const data = doc.data()!;
  return {
    ...data,
    id: doc.id,
    createdAt: toISOString(data.createdAt),
    updatedAt: toISOString(data.updatedAt),
  } as unknown as BacklogEntry;
};

/**
 * Retrieves all backlog entries
 * @returns Array of all backlog entries
 */
export const getAllEntries = async (): Promise<BacklogEntry[]> => {
  try {
    const snapshot = await entryRepository.getAllEntries();
    return snapshot.docs
      .filter((doc) => doc.data() !== undefined)
      .map(mapDocToEntry);
  } catch (error) {
    throw new ServiceError("Failed to retrieve entries", "GET_ENTRIES_FAILED");
  }
};

/**
 * Retrieves a single backlog entry by ID
 * @param id - Entry document ID
 * @returns The backlog entry
 */
export const getEntryById = async (id: string): Promise<BacklogEntry> => {
  const doc = await entryRepository.getEntryById(id);
  if (!doc) throw new ServiceError("Entry not found", "ENTRY_NOT_FOUND", 404);

  const data = doc.data();
  if (!data) throw new ServiceError("Entry data is missing", "ENTRY_DATA_MISSING", 404);

  return mapDocToEntry(doc);
};

/**
 * Creates a new backlog entry
 * @param data - Entry fields from request body
 * @returns The created backlog entry
 */
export const createEntry = async (
  data: Pick<BacklogEntry, "title" | "genre" | "platform" | "status"> &
    Partial<Pick<BacklogEntry, "franchise" | "rating" | "notes">>
): Promise<BacklogEntry> => {
  const now = new Date();
  const entry: Partial<BacklogEntry> = { ...data, createdAt: now, updatedAt: now };
  const id = await entryRepository.createEntry(entry);

  const created = await entryRepository.getEntryById(id);
  if (!created) throw new ServiceError("Entry not found after creation", "ENTRY_NOT_FOUND", 404);

  return mapDocToEntry(created);
};

/**
 * Updates an existing backlog entry and returns the updated entry.
 * Sends a completion email if the status is changed to "completed".
 * @param id - Entry document ID
 * @param data - Fields to update
 * @param uid - The authenticated user's UID
 * @returns The updated backlog entry
 */
export const updateEntry = async (
  id: string,
  data: Partial<Pick<BacklogEntry, "title" | "genre" | "platform" | "franchise" | "status" | "rating" | "notes">>,
  uid?: string
): Promise<BacklogEntry> => {
  const existing = await entryRepository.getEntryById(id);
  if (!existing) throw new ServiceError("Entry not found", "ENTRY_NOT_FOUND", 404);

  await entryRepository.updateEntry(id, { ...data, updatedAt: new Date() });

  // Send completion email if status changed to completed
  if (data.status === "completed" && uid) {
    try {
      const existingData = existing.data();
      const gameTitle = existingData?.title as string ?? "your game";
      const userRecord = await auth.getUser(uid);
      const userEmail = userRecord.email;
      if (userEmail) {
        await sendCompletionEmail(userEmail, gameTitle, uid, data.rating);
      }
    } catch (error) {
      console.error("Failed to send completion email:", error);
    }
  }

  const updated = await entryRepository.getEntryById(id);
  if (!updated) throw new ServiceError("Entry not found after update", "ENTRY_NOT_FOUND", 404);

  return mapDocToEntry(updated);
};

/**
 * Deletes a backlog entry by ID and returns the deleted entry
 * @param id - Entry document ID
 * @returns The deleted backlog entry
 */
export const deleteEntry = async (id: string): Promise<BacklogEntry> => {
  const existing = await entryRepository.getEntryById(id);
  if (!existing) throw new ServiceError("Entry not found", "ENTRY_NOT_FOUND", 404);

  const deletedEntry = mapDocToEntry(existing);
  await entryRepository.deleteEntry(id);
  return deletedEntry;
};