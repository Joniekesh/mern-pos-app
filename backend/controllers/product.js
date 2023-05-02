import Product from "../models/Product.js";

// create product (Admin only)
const createProduct = async (req, res) => {
	const { productName, desc, img, price, countInStock } = req.body;
	const newProduct = new Product({
		productName,
		desc,
		img,
		price,
		countInStock,
	});

	if (!productName || !desc || !img || !price || !countInStock) {
		return res.status(400).json("All fields are required.");
	}

	try {
		const createdProduct = await newProduct.save();

		res.status(200).json(createdProduct);
	} catch (err) {
		res.status(500).json(err);
	}
};

// update product (Admin only)
const updateProduct = async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);

		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
};

// get all products
const getProducts = async (req, res) => {
	const query = req.query.q;

	try {
		let products;
		if (query) {
			products = await Product.find({
				productName: { $regex: query, $options: "i" },
			}).limit(40);
		} else {
			products = await Product.find().limit(40);
		}

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
};

// get product by id
const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
};

// delete product (Admin only)
const deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);

		res.status(200).json("Product Deleted!");
	} catch (err) {
		res.status(500).json(err);
	}
};

export { createProduct, updateProduct, getProducts, getProduct, deleteProduct };
