import * as firestoreRepository from "./firestoreRepository";
import { BacklogEntry } from "../models/entryModel";

const COLLECTION = "entries";

/**
 * Creates a new backlog entry in Firestore
 * @param data - Entry data
 * @returns The ID of the created document
 */
export const createEntry = async (data: Partial<BacklogEntry>): Promise<string> => {
  return firestoreRepository.createDocument<BacklogEntry>(COLLECTION, data);
};

/**
 * Retrieves all backlog entries
 * @returns QuerySnapshot of all entries
 */
export const getAllEntries = async (): Promise<FirebaseFirestore.QuerySnapshot> => {
  return firestoreRepository.getDocuments(COLLECTION);
};

/**
 * Retrieves a single entry by ID
 * @param id - Entry document ID
 * @returns DocumentSnapshot or null
 */
export const getEntryById = async (
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
  return firestoreRepository.getDocumentById(COLLECTION, id);
};

/**
 * Updates an existing entry
 * @param id - Entry document ID
 * @param data - Fields to update
 */
export const updateEntry = async (id: string, data: Partial<BacklogEntry>): Promise<void> => {
  return firestoreRepository.updateDocument<BacklogEntry>(COLLECTION, id, data);
};

/**
 * Deletes an entry by ID
 * @param id - Entry document ID
 */
export const deleteEntry = async (id: string): Promise<void> => {
  return firestoreRepository.deleteDocument(COLLECTION, id);
};