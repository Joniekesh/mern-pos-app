import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

// create sale
const createSale = async (req, res) => {
	const { products, quantity, total } = req.body;
	try {
		if (products && products.length === 0) {
			res.status(400).json("No product items added!");
		} else {
			const newSale = new Sale({
				user: req.user.id,
				products,
				quantity,
				total,
			});

			const createdSale = await newSale.save();

			// await Promise.all(
			// 	createdSale.products.map(async (product) => {
			// 		await Product.findByIdAndUpdate(product._id, {
			// 			...product,
			// 			countInStock: { $inc: -product.quantity },
			// 		});
			// 	})
			// );

			const sale = await Sale.findById(createdSale._id).populate(
				"user",
				"name phone"
			);
			return res.status(200).json(sale);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

// get all sales (Admin only)
const getAllSales = async (req, res) => {
	try {
		const sales = await Sale.find()
			.sort({ createdAt: -1 })
			.populate("user", "name email phone img");

		if (!sales) return res.status(404).json("Sales not found.");

		res.status(200).json(sales);
	} catch (err) {
		res.status(500).json(err);
	}
};

// get latest sales (Admin only)
const getLatestSales = async (req, res) => {
	try {
		const sales = await Sale.find()
			.sort({ createdAt: -1 })
			.limit(4)
			.populate("user", "name email phone img");

		if (!sales) return res.status(404).json("Sales not found.");

		res.status(200).json(sales);
	} catch (err) {
		res.status(500).json(err);
	}
};

// get sale by id (Admin only)
const getSale = async (req, res) => {
	try {
		const sale = await Sale.findById(req.params.id).populate(
			"user",
			"name email phone img"
		);

		if (!sale) return res.status(404).json("Sale not found.");

		res.status(200).json(sale);
	} catch (err) {
		res.status(500).json(err);
	}
};

// get logged in cashier sales
const getRepSales = async (req, res) => {
	const date = new Date();
	const start = date.setHours(0, 0, 0, 0);
	const end = date.setHours(23, 59, 59, 999);
	try {
		const sales = await Sale.find({
			user: req.user.id,
			createdAt: { $gte: start, $lt: end },
		})
			.sort({ createdAt: -1 })
			.populate("user", "name email phone img");

		if (!sales) return res.status(404).json("Sales not found.");

		res.status(200).json(sales);
	} catch (err) {
		res.status(500).json(err);
	}
};

// get sales statistics
const getSalesStats = async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await Sale.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{ $project: { total: true, month: { $month: "$createdAt" } } },
			{ $group: { _id: "$month", total: { $sum: "$total" } } },
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
};

// get sales statistics
const deleteSale = async (req, res) => {
	try {
		await Sale.findByIdAndDelete(req.params.id);
		res.status(200).json("Order deleted.");
	} catch (err) {
		res.status(500).json(err);
	}
};

export {
	createSale,
	getAllSales,
	getSale,
	getRepSales,
	getLatestSales,
	getSalesStats,
	deleteSale,
};
