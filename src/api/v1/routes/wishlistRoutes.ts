import express, { Router } from "express";
import * as wishlistController from "../controllers/wishlistController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { wishlistSchemas } from "../validation/wishlistSchemas";

const router: Router = express.Router();

/**
 * @openapi
 * /wishlist:
 *   get:
 *     summary: Get all wishlist items
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of wishlist items retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user", "viewer"] }),
  wishlistController.getAllWishlistItems
);

/**
 * @openapi
 * /wishlist/{id}:
 *   get:
 *     summary: Get a single wishlist item by ID
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Wishlist item retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Wishlist item not found
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user", "viewer"] }),
  validateRequest(wishlistSchemas.getById),
  wishlistController.getWishlistItemById
);

/**
 * @openapi
 * /wishlist:
 *   post:
 *     summary: Add a new item to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wishlist'
 *     responses:
 *       '201':
 *         description: Wishlist item created successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"] }),
  validateRequest(wishlistSchemas.create),
  wishlistController.createWishlistItem
);

/**
 * @openapi
 * /wishlist/{id}:
 *   put:
 *     summary: Update an existing wishlist item
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wishlist'
 *     responses:
 *       '200':
 *         description: Wishlist item updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Wishlist item not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"] }),
  validateRequest(wishlistSchemas.update),
  wishlistController.updateWishlistItem
);

/**
 * @openapi
 * /wishlist/{id}:
 *   delete:
 *     summary: Delete a wishlist item
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Wishlist item deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Wishlist item not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"] }),
  validateRequest(wishlistSchemas.delete),
  wishlistController.deleteWishlistItem
);

export default router;