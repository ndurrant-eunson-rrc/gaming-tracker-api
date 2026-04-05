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
 * Creates a new backlog entry
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
    const id = await entryService.createEntry(req.body);
    res.status(HTTP_STATUS.CREATED).json(successResponse({ id }, "Entry created"));
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing backlog entry
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
    const updatedEntry = await entryService.updateEntry(req.params.id as string, req.body);
    res.status(HTTP_STATUS.OK).json(successResponse(updatedEntry, "Entry updated"));
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a backlog entry by ID
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
    await entryService.deleteEntry(req.params.id as string);
    res.status(HTTP_STATUS.OK).json(successResponse({}, "Entry deleted"));
  } catch (error) {
    next(error);
  }
};