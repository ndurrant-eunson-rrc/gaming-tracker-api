import { Request, Response, NextFunction } from "express";
import * as wishlistService from "../services/wishlistService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Retrieves all wishlist items
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllWishlistItems = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const items = await wishlistService.getAllWishlistItems();
		res.status(HTTP_STATUS.OK).json(successResponse(items));
	} catch (error) {
		next(error);
	}
};

/**
 * Retrieves a single wishlist item by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getWishlistItemById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const item = await wishlistService.getWishlistItemById(req.params.id as string);
		res.status(HTTP_STATUS.OK).json(successResponse(item));
	} catch (error) {
		next(error);
	}
};

/**
 * Creates a new wishlist item and returns the created item.
 * Sends a confirmation email to the user after creation,
 * by passing authenticated user's UID to the service layer.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createWishlistItem = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const uid: string = res.locals.uid;
		const createdItem = await wishlistService.createWishlistItem(req.body, uid);
		res.status(HTTP_STATUS.CREATED).json(successResponse(createdItem, "Wishlist item created"));
	} catch (error) {
		next(error);
	}
};

/**
 * Updates an existing wishlist item and returns the updated item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateWishlistItem = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const updatedItem = await wishlistService.updateWishlistItem(req.params.id as string, req.body);
		res.status(HTTP_STATUS.OK).json(successResponse(updatedItem, "Wishlist item updated"));
	} catch (error) {
		next(error);
	}
};

/**
 * Deletes a wishlist item and returns the deleted item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteWishlistItem = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const deletedItem = await wishlistService.deleteWishlistItem(req.params.id as string);
		res.status(HTTP_STATUS.OK).json(successResponse(deletedItem, "Wishlist item deleted"));
	} catch (error) {
		next(error);
	}
};