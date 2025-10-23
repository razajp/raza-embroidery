import express from "express";
import { getPin, setPin } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/pin", getPin);
router.post("/pin", setPin);

export default router;