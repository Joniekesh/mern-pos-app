import { useState } from "react";
import "./createProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/apiCalls/ProductApi";
import { makeRequest } from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
	const [file, setFile] = useState(null);
	const [productName, setProductName] = useState("");
	const [desc, setDesc] = useState("");
	const [price, setPrice] = useState("");
	const [countInStock, setCountInStock] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading } = useSelector((state) => state.product);
	const { currentUser } = useSelector((state) => state.auth);
	const user = currentUser?.user;

	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await makeRequest.post("/upload", formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const isNotValid = !file || !productName || !price || !countInStock || !desc;

	const handleSubmit = async (e) => {
		e.preventDefault();

		let imgUrl = "";
		if (file) imgUrl = await upload();

		const newProduct = {
			user: user._id,
			productName,
			desc,
			price,
			countInStock,
			img: imgUrl,
		};

		dispatch(createProduct(newProduct));

		navigate("/dashboard/products");
	};

	return (
		<div className="createProduct">
			<div className="createProductContainer">
				<h2>New Product</h2>
				<form onSubmit={handleSubmit}>
					<div className="formInput">
						<label>Image</label>
						<input type="file" onChange={(e) => setFile(e.target.files[0])} />
					</div>
					<div className="formInput">
						<label>Product Name</label>
						<input
							type="text"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/>
					</div>
					<div className="formInput">
						<label>Product Description</label>
						<input
							type="text"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</div>
					<div className="formInput">
						<label>Product Price</label>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div className="formInput">
						<label>Count In Stock</label>
						<input
							type="number"
							value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}
						/>
					</div>
					<button type="submit" disabled={isNotValid}>
						Create
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProduct;
