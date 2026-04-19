import { Request, Response, NextFunction } from "express";
import * as entryService from "../services/entryService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Retrieves all backlog entries
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const entries = await entryService.getAllEntries();
    res.status(HTTP_STATUS.OK).json(successResponse(entries));
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single backlog entry by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getEntryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const entry = await entryService.getEntryById(req.params.id as string);
    res.status(HTTP_STATUS.OK).json(successResponse(entry));
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new backlog entry and returns the created entry
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const createdEntry = await entryService.createEntry(req.body);
    res.status(HTTP_STATUS.CREATED).json(successResponse(createdEntry, "Entry created"));
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing backlog entry and returns the updated entry
 * Passes the authenticated user's UID so a completion email can be sent
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const uid: string = res.locals.uid;
    const updatedEntry = await entryService.updateEntry(req.params.id as string, req.body, uid);
    res.status(HTTP_STATUS.OK).json(successResponse(updatedEntry, "Entry updated"));
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a backlog entry and returns the deleted entry
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedEntry = await entryService.deleteEntry(req.params.id as string);
    res.status(HTTP_STATUS.OK).json(successResponse(deletedEntry, "Entry deleted"));
  } catch (error) {
    next(error);
  }
};