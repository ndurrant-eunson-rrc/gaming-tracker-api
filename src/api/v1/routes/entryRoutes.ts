import express, { Router } from "express";
import * as entryController from "../controllers/entryController";
//import authenticate from "../middleware/authenticate";
import { validateRequest } from "../middleware/validate";
import { entrySchemas } from "../validation/entrySchemas";

const router: Router = express.Router();

router.get("/", validateRequest(entrySchemas.create), entryController.getAllEntries);
router.get("/:id", validateRequest(entrySchemas.getById), entryController.getEntryById);
router.post("/", validateRequest(entrySchemas.create), entryController.createEntry);
router.put("/:id", validateRequest(entrySchemas.update), entryController.updateEntry);
router.delete("/:id", validateRequest(entrySchemas.delete), entryController.deleteEntry);

export default router;