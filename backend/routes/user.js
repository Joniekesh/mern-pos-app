import express from "express";
import {
	createUser,
	deletUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers/user.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, admin, createUser);
router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUser);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deletUser);

export default router;
