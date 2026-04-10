import * as entryRepository from "../repositories/entryRepository";
import { BacklogEntry } from "../models/entryModel";
import { ServiceError } from "../errors/errors";

/**
 * Converts a Firestore Timestamp or Date to an ISO string
 * @param value - Timestamp or Date object
 * @returns ISO date string
 */
const toISOString = (value: FirebaseFirestore.Timestamp | Date): string => {
  if (value instanceof Date) return value.toISOString();
  return value.toDate().toISOString();
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
      .map((doc) => {
        const data = doc.data()!;
        return {
          ...data,
          id: doc.id,
          createdAt: toISOString(data.createdAt),
          updatedAt: toISOString(data.updatedAt),
        } as unknown as BacklogEntry;
      });
  } catch (error) {
    throw new ServiceError("Failed to retrieve entries", "GET_ENTRIES_FAILED");
  }
};

export const getEntryById = async (id: string): Promise<BacklogEntry> => {
  const doc = await entryRepository.getEntryById(id);
  if (!doc) throw new ServiceError("Entry not found", "ENTRY_NOT_FOUND", 404);
  
  const data = doc.data();
  if (!data) throw new ServiceError("Entry data is missing", "ENTRY_DATA_MISSING", 404);

  return {
    ...data,
    id: doc.id,
    createdAt: toISOString(data.createdAt),
    updatedAt: toISOString(data.updatedAt),
  } as unknown as BacklogEntry;
};

/**
 * Creates a new backlog entry
 * @param data - Entry fields from request body
 * @returns The ID of the created entry
 */
export const createEntry = async (
  data: Pick<BacklogEntry, "title" | "genre" | "platform" | "status"> &
    Partial<Pick<BacklogEntry, "franchise" | "rating" | "notes">>
): Promise<string> => {
  const now = new Date();
  const entry: Partial<BacklogEntry> = { ...data, createdAt: now, updatedAt: now };
  return entryRepository.createEntry(entry);
};

/**
 * Updates an existing backlog entry and returns the updated entry
 * @param id - Entry document ID
 * @param data - Fields to update
 * @returns The updated backlog entry
 */
export const updateEntry = async (
  id: string,
  data: Partial<Pick<BacklogEntry, "title" | "genre" | "platform" | "franchise" | "status" | "rating" | "notes">>
): Promise<BacklogEntry> => {
  const existing = await entryRepository.getEntryById(id);
  if (!existing) throw new ServiceError("Entry not found", "ENTRY_NOT_FOUND", 404);

  await entryRepository.updateEntry(id, { ...data, updatedAt: new Date() });

  // This will fetch the updated document and return it in the confirmation response.
  const updated = await entryRepository.getEntryById(id);
  if (!updated) throw new ServiceError("Entry not found after update", "ENTRY_NOT_FOUND", 404);

  const updatedData = updated.data();
  if (!updatedData) throw new ServiceError("Entry data is missing", "ENTRY_DATA_MISSING", 404);

  return {
    ...updatedData,
    id: updated.id,
    createdAt: toISOString(updatedData.createdAt),
    updatedAt: toISOString(updatedData.updatedAt),
  } as unknown as BacklogEntry;
};

/**
 * Deletes a backlog entry by ID
 * @param id - Entry document ID
 */
export const deleteEntry = async (id: string): Promise<void> => {
  const existing = await entryRepository.getEntryById(id);
  if (!existing) throw new ServiceError("Entry not found", "ENTRY_NOT_FOUND", 404);
  await entryRepository.deleteEntry(id);
};