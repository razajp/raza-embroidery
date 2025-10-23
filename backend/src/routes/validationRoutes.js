import express from "express";
import { validationController } from "../controllers/validationController.js";

const router = express.Router();

// Generic route for all collections
router.get("/:collection/check-:field", validationController.checkUnique);

export default router;
