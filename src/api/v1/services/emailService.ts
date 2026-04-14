import nodemailer from "nodemailer";
import { ServiceError } from "../errors/errors";

/**
 * Creates a Nodemailer transporter using SMTP credentials from environment variables
 * @returns Nodemailer transporter instance
 */
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

/**
 * Sends a welcome email when a new user registers
 * @param toEmail - The recipient's email address
 * @param userID - The recipient's user ID
 */
export const sendWelcomeEmail = async (
    toEmail: string,
    userID: string
): Promise<void> => {
    try {
        const transporter = createTransporter();

        await transporter.sendMail({
            from: `"Gaming Tracker" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: "Welcome to the Gaming Tracker!",
            html: `
        <h1>Welcome, ${userID}!</h1>
        <p>Your account has been created successfully.</p>
        <p>You can now start tracking your gaming activities, writing reviews, and managing your wishlist.</p>
        <br/>
        <p>Happy gaming!</p>
        <p><strong>Gaming Tracker</strong></p>
      `,
        });
    } catch (error) {
        throw new ServiceError("Failed to send welcome email", "EMAIL_SEND_FAILED");
    }
};

/**
 * Sends a completion email when a user marks an entry as completed
 * @param toEmail - The recipient's email address
 * @param userID - The recipient's user ID
 * @param gameTitle - The title of the completed game
 * @param rating - The rating the user gave the game which is optional
 */
export const sendCompletionEmail = async (
    toEmail: string,
    gameTitle: string,
    userId: string,
    rating?: number
): Promise<void> => {
    try {
        const transporter = createTransporter();

        const ratingText = rating
            ? `You rated it <strong>${rating}/10</strong>.`
            : "You didn't leave a rating.";

        await transporter.sendMail({
            from: `"Gaming Tracker" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: `You completed ${gameTitle}!`,
            html: `
    <h1>Good job!</h1>
    <p>You just completed <strong>${gameTitle}</strong>!</p>
    <p>${ratingText}</p>
    <br/>
    <p>Keep up the great work and happy gaming!</p>
    <p><strong>Gaming Tracker</strong></p>
    `,
        });
    } catch (error) {
        throw new ServiceError("Failed to send completion email", "EMAIL_SEND_FAILED");
    }
};

/**
 * Sends a confirmation email when a user creates a review
 * @param toEmail - The recipient's email address
 * @param gameTitle - The title of the reviewed game
 * @param score - The score the user gave the game
 */
export const sendReviewEmail = async (
  toEmail: string,
  gameTitle: string,
  score: number
): Promise<void> => {
  try {
    const transporter = createTransporter();
 
    await transporter.sendMail({
      from: `"Gaming Tracker" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `You reviewed ${gameTitle}!`,
      html: `
        <h1>Review created!</h1>
        <p>You reviewed <strong>${gameTitle}</strong> and gave it <strong>${score}/10</strong>.</p>
        <br/>
        <p><strong>Gaming Tracker</strong></p>
      `,
    });
  } catch (error) {
    throw new ServiceError("Failed to send review email", "EMAIL_SEND_FAILED");
  }
};
 
/**
 * Sends a confirmation email when a user adds a game to their wishlist
 * @param toEmail - The recipient's email address
 * @param gameTitle - The title of the wishlisted game
 * @param priority - The priority level set by the user
 */
export const sendWishlistEmail = async (
  toEmail: string,
  gameTitle: string,
  priority: string
): Promise<void> => {
  try {
    const transporter = createTransporter();
 
    await transporter.sendMail({
      from: `"Gaming Tracker" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `${gameTitle} added to your wishlist!`,
      html: `
        <h1>Wishlist updated!</h1>
        <p><strong>${gameTitle}</strong> has been added to your wishlist with <strong>${priority}</strong> priority.</p>
        <br/>
        <p><strong>Gaming Tracker</strong></p>
      `,
    });
  } catch (error) {
    throw new ServiceError("Failed to send wishlist email", "EMAIL_SEND_FAILED");
  }
};
 