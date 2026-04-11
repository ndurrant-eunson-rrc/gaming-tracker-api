import express, { Router } from "express";
import * as entryController from "../controllers/entryController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { entrySchemas } from "../validation/entrySchemas";

const router: Router = express.Router();

/**
 * @openapi
 * /entries:
 *   get:
 *     summary: Get all backlog entries
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of entries retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user", "viewer"] }),
  entryController.getAllEntries
);

/**
 * @openapi
 * /entries/{id}:
 *   get:
 *     summary: Get a single entry by ID
 *     tags: [Entries]
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
 *         description: Entry retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Entry not found
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user", "viewer"] }),
  validateRequest(entrySchemas.getById),
  entryController.getEntryById
);

/**
 * @openapi
 * /entries:
 *   post:
 *     summary: Create a new backlog entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BacklogEntry'
 *     responses:
 *       '201':
 *         description: Entry created successfully
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
  validateRequest(entrySchemas.create),
  entryController.createEntry
);

/**
 * @openapi
 * /entries/{id}:
 *   put:
 *     summary: Update an existing backlog entry
 *     tags: [Entries]
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
 *             $ref: '#/components/schemas/BacklogEntry'
 *     responses:
 *       '200':
 *         description: Entry updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Entry not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"] }),
  validateRequest(entrySchemas.update),
  entryController.updateEntry
);

/**
 * @openapi
 * /entries/{id}:
 *   delete:
 *     summary: Delete a backlog entry
 *     tags: [Entries]
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
 *         description: Entry deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Entry not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"] }),
  validateRequest(entrySchemas.delete),
  entryController.deleteEntry
);

export default router;