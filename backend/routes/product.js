import express from "express";
import {
	createProduct,
	updateProduct,
	getProducts,
	getProduct,
	deleteProduct,
} from "../controllers/product.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.get("/", protect, getProducts);
router.get("/find/:id", protect, getProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
