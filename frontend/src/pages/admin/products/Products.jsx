import { useDispatch, useSelector } from "react-redux";
import "./products.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

import Loader from "../../../components/loader/Loader";
import { deleteProduct } from "../../../redux/apiCalls/ProductApi";

const Products = () => {
	const { profile } = useSelector((state) => state.profile);
	const { products, loading } = useSelector((state) => state.product);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleNavigate = (product) => {
		navigate(`/dashboard/products/${product._id}`, { state: product });
	};

	useEffect(() => {
		profile && !profile.isAdmin && navigate("/");
	}, []);

	return (
		<div className="products">
			<div className="productsContainer">
				<div className="top">
					<h2>All Products</h2>
					<Link to="/dashboard/products/create" className="link">
						<button>
							<AiOutlinePlus />
							CREATE
						</button>
					</Link>
				</div>
				{loading ? (
					<Loader />
				) : products?.length > 0 ? (
					<div className="table">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Image</th>
									<th>Name</th>
									<th>Price</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>
											<div className="cashierInfo">
												<img
													src={"/upload/" + product.img}
													alt=""
													className="image"
												/>
											</div>
										</td>
										<td>{product.productName}</td>
										<td className="amount">$ {product.price}</td>
										<td>
											<div className="action">
												<span
													className="view"
													onClick={() => handleNavigate(product)}
												>
													View
												</span>
												<span
													className="trash"
													onClick={() => dispatch(deleteProduct(product._id))}
												>
													<BiTrashAlt />
												</span>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<span className="noSales">No products.</span>
				)}
			</div>
		</div>
	);
};

export default Products;
