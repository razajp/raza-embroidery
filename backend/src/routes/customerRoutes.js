import express from "express";
import { customerController } from "../controllers/customerController.js";

const router = express.Router();

router.post("/add", customerController.add);
router.get("/show", customerController.show);
router.patch("/toggle-status/:id", customerController.toggleStatus);

export default router;
