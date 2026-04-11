import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Sets custom claims (roles) for a user.
 * Only accessible by admins.
 * After setting claims, the user must obtain a new token for changes to take effect.
 * @param req - Express request object containing uid and claims in body
 * @param res - Express response object
 * @param next - Express next function
 */
export const setCustomClaims = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { uid, claims } = req.body;

  try {
    await auth.setCustomUserClaims(uid, claims);
    res.status(HTTP_STATUS.OK).json(
      successResponse(
        { uid, claims },
        "Custom claims set successfully. User must obtain a new token for changes to take effect."
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a user's details from Firebase Authentication.
 * Only accessible by admins.
 * @param req - Express request object containing user id in params
 * @param res - Express response object
 * @param next - Express next function
 */
export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await auth.getUser(id as string);
    res.status(HTTP_STATUS.OK).json(successResponse(user));
  } catch (error) {
    next(error);
  }
};