import express, { Router } from "express";
import { setCustomClaims, getUserDetails } from "./../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { sendWelcomeEmail } from "../services/emailService"; // for testing email sending

const router: Router = express.Router();

/**
 * @openapi
 * /admin/setCustomClaims:
 *   post:
 *     summary: Set a role for a user (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [uid, claims]
 *             properties:
 *               uid:
 *                 type: string
 *                 description: The Firebase UID of the user
 *                 example: "abc123uid"
 *               claims:
 *                 type: object
 *                 description: The claims to set on the user
 *                 example: { "role": "admin" }
 *     responses:
 *       '200':
 *         description: Claims set successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
  "/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  setCustomClaims
);

/**
 * @openapi
 * /admin/users/{id}:
 *   get:
 *     summary: Get a user's details (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Firebase UID of the user
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get(
  "/users/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  getUserDetails
);

// this is for testing email sending, will be removed and properly implemented later
router.post("/test-email", async (req, res, next) => {
  try {
    const { email, name } = req.body;
    await sendWelcomeEmail(email, name);
    res.status(200).json({ status: "success", message: "Test email sent" });
  } catch (error) {
    next(error);
  }
});

export default router;