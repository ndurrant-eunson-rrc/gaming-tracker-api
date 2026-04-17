import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Retrieves all reviews
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(HTTP_STATUS.OK).json(successResponse(reviews));
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single review by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const review = await reviewService.getReviewById(req.params.id as string);
    res.status(HTTP_STATUS.OK).json(successResponse(review));
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new review and returns the created review
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const uid: string = res.locals.uid;
    const createdReview = await reviewService.createReview(req.body, uid);
    res.status(HTTP_STATUS.CREATED).json(successResponse(createdReview, "Review created"));
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing review and returns the updated review
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedReview = await reviewService.updateReview(req.params.id as string, req.body);
    res.status(HTTP_STATUS.OK).json(successResponse(updatedReview, "Review updated"));
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a review and returns the deleted review
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedReview = await reviewService.deleteReview(req.params.id as string);
    res.status(HTTP_STATUS.OK).json(successResponse(deletedReview, "Review deleted"));
  } catch (error) {
    next(error);
  }
};