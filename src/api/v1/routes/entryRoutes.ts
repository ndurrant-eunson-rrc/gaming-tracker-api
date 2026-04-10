import express, { Router } from "express";
import * as entryController from "../controllers/entryController";
//import authenticate from "../middleware/authenticate";
import { validateRequest } from "../middleware/validate";
import { entrySchemas } from "../validation/entrySchemas";

const router: Router = express.Router();

/**
 * @openapi
 * /entries:
 *   get:
 *     summary: Get all backlog entries
 *     tags: [Entries]
 *     responses:
 *       '200':
 *         description: List of entries retrieved successfully
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
 *                     $ref: '#/components/schemas/BacklogEntry'
 */
router.get("/", validateRequest(entrySchemas.create), entryController.getAllEntries);

/**
 * @openapi
 * /entries/{id}:
 *   get:
 *     summary: Get a single entry by ID
 *     tags: [Entries]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BacklogEntry'
 *       '404':
 *         description: Entry not found
 */
router.get("/:id", validateRequest(entrySchemas.getById), entryController.getEntryById);

/**
 * @openapi
 * /entries:
 *   post:
 *     summary: Create a new entry
 *     tags: [Entries]
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
 */
router.post("/", validateRequest(entrySchemas.create), entryController.createEntry);

/**
 * @openapi
 * /entries/{id}:
 *   put:
 *     summary: Update an existing backlog entry
 *     tags: [Entries]
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
 *       '404':
 *         description: Entry not found
 */
router.put("/:id", validateRequest(entrySchemas.update), entryController.updateEntry);

/**
 * @openapi
 * /entries/{id}:
 *   delete:
 *     summary: Delete a backlog entry
 *     tags: [Entries]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Entry deleted successfully
 *       '404':
 *         description: Entry not found
 */
router.delete("/:id", validateRequest(entrySchemas.delete), entryController.deleteEntry);

export default router;