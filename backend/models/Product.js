import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
		},
		qty: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
