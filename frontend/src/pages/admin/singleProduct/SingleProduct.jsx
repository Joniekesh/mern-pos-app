import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import "./singleProduct.scss";
import { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../redux/apiCalls/ProductApi";
import Loader from "../../../components/loader/Loader";
import { makeRequest } from "../../../utils/axiosInstance";

const SingleProduct = () => {
	const { product, loading } = useSelector((state) => state.product);
	const { currentUser } = useSelector((state) => state.auth);

	const user = currentUser?.user;

	const { state } = useLocation();
	const navigate = useNavigate();

	const [productName, setProductName] = useState(state?.productName);
	const [desc, setDesc] = useState(state?.desc);
	const [file, setFile] = useState("");
	const [price, setPrice] = useState(state?.price);
	const [countInStock, setCountInStock] = useState(state?.countInStock);

	const { id } = useParams();
	const dispatch = useDispatch();

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

	const submitHandler = async (e) => {
		e.preventDefault();

		let imgUrl = "";
		if (file) imgUrl = await upload();

		const updatedProduct = {
			user: user._id,
			productName,
			desc,
			price,
			countInStock,
			img: imgUrl || state.img,
		};

		dispatch(updateProduct(state._id, updatedProduct));

		navigate("/dashboard/products");
	};

	useEffect(() => {
		dispatch(getProduct(id));
	}, [dispatch, id]);

	return (
		<div className="singleProduct">
			{loading ? (
				<Loader />
			) : (
				<div className="singleProductContainer">
					<div className="action">
						<h2>Product</h2>
						<Link to="/dashboard/products/create" className="link">
							<button>
								<AiOutlinePlus />
								CREATE
							</button>
						</Link>
					</div>
					<div className="top">
						<div className="left">product sales performance chart</div>
						<div className="right">
							<div className="itemDetails">
								<div className="item">
									{file ? (
										<img src={URL.createObjectURL(file)} alt="" />
									) : (
										<img src={"/upload/" + state.img} alt="" />
									)}
									<span className="itemName">{state?.productName}</span>
								</div>
								<div className="item">
									<span className="key">ID:</span>
									<span className="value">{state?._id}</span>
								</div>
								<div className="item">
									<span className="key">Price:</span>
									<span className="value">$ {state?.price}</span>
								</div>
								<div className="item">
									<span className="key">Count In Stock:</span>
									<span className="value">{state?.countInStock}</span>
								</div>
								<div className="item">
									<span className="key">Sales:</span>
									<span className="value">123</span>
								</div>
							</div>
						</div>
					</div>
					<div className="bottom">
						<form onSubmit={submitHandler}>
							<div className="formLeft">
								<div className="formInput">
									<label>Product Name</label>
									<input
										type="text"
										defaultValue={productName}
										onChange={(e) => setProductName(e.target.value)}
									/>
								</div>
								<div className="formInput">
									<label>Product Description</label>
									<input
										type="text"
										defaultValue={desc}
										onChange={(e) => setDesc(e.target.value)}
									/>
								</div>
								<div className="formInput">
									<label>Product Price</label>
									<input
										type="number"
										defaultValue={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
								<div className="formInput">
									<label>Count In Stock</label>
									<input
										type="number"
										defaultValue={countInStock}
										onChange={(e) => setCountInStock(e.target.value)}
									/>
								</div>
							</div>
							<div className="formRight">
								<div className="upload">
									{file ? (
										<img src={URL.createObjectURL(file)} alt="" />
									) : (
										<img src={"/upload/" + state.img} alt="" />
									)}
									<div className="inputDiv">
										<label htmlFor="imgId">
											<AiOutlineCloudUpload />
										</label>
										<input
											type="file"
											id="imgId"
											style={{ display: "none" }}
											onChange={(e) => setFile(e.target.files[0])}
										/>
									</div>
								</div>
								<button type="submit">Update</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleProduct;
