import express from "express";
import { createNotification } from "../controllers/notification.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();
router.post("/", protect, admin, createNotification);

export default router;
