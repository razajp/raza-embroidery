import express from "express";
import { customerController } from "../controllers/customerController.js";

const router = express.Router();

router.post("/", customerController.add);
router.get("/", customerController.list);

export default router;
