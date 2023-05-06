import express from "express";
import {
	createSale,
	getAllSales,
	getSale,
	getRepSales,
	getLatestSales,
	getSalesStats,
	deleteSale,
} from "../controllers/sale.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createSale);
router.get("/", protect, admin, getAllSales);
router.get("/find/:id", protect, admin, getSale);
router.get("/me", protect, getRepSales);
router.get("/latest", protect, admin, getLatestSales);
router.get("/stats", protect, admin, getSalesStats);
router.delete("/:id", protect, admin, deleteSale);

export default router;
