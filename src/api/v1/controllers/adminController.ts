import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { sendWelcomeEmail } from "../services/emailService";

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

/**
 * Creates a new Firebase user, automatically assigns a user role, and sends a welcome email
 * @param req - Express request object containing email, password, displayName in body
 * @param res - Express response object
 * @param next - Express next function
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, displayName } = req.body;

  try {
    // Creates the user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Automatically assigns default "user" role
    await auth.setCustomUserClaims(userRecord.uid, { role: "user" });

    // Sends welcome email
    await sendWelcomeEmail(email, displayName ?? email);

    res.status(HTTP_STATUS.CREATED).json(
      successResponse(
        {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          role: "user",
        },
        "User created successfully. Welcome email sent."
      )
    );
  } catch (error) {
    next(error);
  }
};