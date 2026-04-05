import * as firestoreRepository from "./firestoreRepository";
import { BacklogEntry } from "../models/entryModel";

const COLLECTION = "backlogEntries";

/**
 * Creates a new backlog entry in Firestore
 * @param data - Partial entry data
 * @returns The ID of the new document
 */
export const createEntry = async (data: Partial<BacklogEntry>): Promise<string> => {
  return firestoreRepository.createDocument<BacklogEntry>(COLLECTION, data);
};

/**
 * Retrieves a single entry by ID
 * @param id - The document ID
 */
export const getEntryById = async (id: string) => {
  return firestoreRepository.getDocumentById(COLLECTION, id);
};

/**
 * Updates an existing entry
 * @param id - The document ID
 * @param data - Fields to update
 */
export const updateEntry = async (id: string, data: Partial<BacklogEntry>): Promise<void> => {
  return firestoreRepository.updateDocument<BacklogEntry>(COLLECTION, id, data);
};

/**
 * Deletes an entry by ID
 * @param id - The document ID
 */
export const deleteEntry = async (id: string): Promise<void> => {
  return firestoreRepository.deleteDocument(COLLECTION, id);
};