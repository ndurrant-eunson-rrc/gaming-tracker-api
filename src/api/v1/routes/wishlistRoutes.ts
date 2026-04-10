import express, { Router } from "express";
import * as wishlistController from "../controllers/wishlistController";
import { validateRequest } from "../middleware/validate";
import { wishlistSchemas } from "../validation/wishlistSchemas";

const router: Router = express.Router();

/**
 * @openapi
 * /wishlist:
 *   get:
 *     summary: Get all wishlist items
 *     tags: [Wishlist]
 *     responses:
 *       '200':
 *         description: List of wishlist items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Wishlist'
 */
router.get("/", wishlistController.getAllWishlistItems);

/**
 * @openapi
 * /wishlist/{id}:
 *   get:
 *     summary: Get a single wishlist item by ID
 *     tags: [Wishlist]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Wishlist item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       '404':
 *         description: Wishlist item not found
 */
router.get("/:id", validateRequest(wishlistSchemas.getById), wishlistController.getWishlistItemById);

/**
 * @openapi
 * /wishlist:
 *   post:
 *     summary: Add a new item to the wishlist
 *     tags: [Wishlist]
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
 */
router.post("/", validateRequest(wishlistSchemas.create), wishlistController.createWishlistItem);

/**
 * @openapi
 * /wishlist/{id}:
 *   put:
 *     summary: Update an existing wishlist item
 *     tags: [Wishlist]
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
 *       '404':
 *         description: Wishlist item not found
 */
router.put("/:id", validateRequest(wishlistSchemas.update), wishlistController.updateWishlistItem);

/**
 * @openapi
 * /wishlist/{id}:
 *   delete:
 *     summary: Delete a wishlist item
 *     tags: [Wishlist]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Wishlist item deleted successfully
 *       '404':
 *         description: Wishlist item not found
 */
router.delete("/:id", validateRequest(wishlistSchemas.delete), wishlistController.deleteWishlistItem);

export default router;