import { useDispatch, useSelector } from "react-redux";
import "./cartItem.scss";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
	removeFromCart,
	decreaseCart,
	increaseCart,
} from "../../redux/reducers/CartRedux";
import { toast } from "react-toastify";

const CatItem = ({ product }) => {
	const dispatch = useDispatch();

	const { products } = useSelector((state) => state.cart);

	const handleRemove = (product) => {
		dispatch(removeFromCart(product));
		toast.success(product.productName + " removed from the cart", {
			theme: "colored",
		});
	};

	return (
		<div className="catItem">
			<div className="catDetails">
				<img src={"/upload/" + product.img} alt="" />
				<div className="catDetails">
					<span className="producTitle">{product.productName}</span>
					<div className="btns">
						<button onClick={() => dispatch(decreaseCart(product))}>
							<AiOutlineMinus
								style={{ fontWeight: "bold", fontSize: "16px" }}
							/>
						</button>
						<span className="calc">{product.qty}</span>
						<button onClick={() => dispatch(increaseCart(product))}>
							<AiOutlinePlus style={{ fontWeight: "bold", fontSize: "16px" }} />
						</button>
					</div>
				</div>
				<div className="actions">
					<span className="productPrice">${product.price?.toFixed(2)}</span>
					<span className="trash" onClick={() => handleRemove(product)}>
						<BiTrashAlt />
					</span>
				</div>
			</div>
			<hr className="line" />
		</div>
	);
};

export default CatItem;
