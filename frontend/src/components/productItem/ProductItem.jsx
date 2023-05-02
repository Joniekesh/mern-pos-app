import { addToCart } from "../../redux/reducers/CartRedux";
import "./productItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { currentUser } = useSelector((state) => state.auth);
	const user = currentUser?.user;

	const addProduct = (product) => {
		dispatch(addToCart(product));
	};

	const handleNavigate = (product) => {
		navigate(`/dashboard/products/${product._id}`, { state: product });
	};

	return (
		<>
			<div
				className="product"
				onClick={() =>
					user && user.isAdmin ? handleNavigate(product) : addProduct(product)
				}
			>
				<img src={"/upload/" + product.img} alt="" />
				<h3>{product.productName}</h3>
				<p>{product.desc}</p>
				<span>${product.price}</span>
			</div>
		</>
	);
};

export default ProductItem;
