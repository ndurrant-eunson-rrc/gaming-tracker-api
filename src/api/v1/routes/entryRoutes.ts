import express, { Router } from "express";
import * as entryController from "../controllers/entryController";
//import authenticate from "../middleware/authenticate";
//import { validateRequest } from "../middleware/validate";
//import { entrySchemas } from "../validations/entryValidation";

const router: Router = express.Router();

router.get("/", entryController.getAllEntries);
router.get("/:id", entryController.getEntryById);
router.post("/", entryController.createEntry);
router.put("/:id", entryController.updateEntry);
router.delete("/:id", entryController.deleteEntry);

export default router;