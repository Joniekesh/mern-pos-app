import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
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
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		quantity: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
			default: 0.0,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Sale", SaleSchema);
