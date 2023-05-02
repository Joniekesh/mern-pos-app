import express from "express";
import { getProfile, login, register } from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/", protect, getProfile);

export default router;
