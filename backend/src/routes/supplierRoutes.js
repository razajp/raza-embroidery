import express from "express";
import { supplierController } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/add", supplierController.add);
router.get("/show", supplierController.show);
router.patch("/toggle-status/:id", supplierController.toggleStatus);

export default router;
