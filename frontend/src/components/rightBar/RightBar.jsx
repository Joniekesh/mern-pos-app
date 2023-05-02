import "./rightBar.scss";
import CatItem from "../cartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/reducers/CartRedux";
import { useRef, useState } from "react";
import { ComponentToPrint } from "../componentToPrint/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import { makeRequest } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

const RightBar = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	const type = window.location.href.indexOf("dashboard") > -1;

	const componentRef = useRef();

	const { products, quantity, total } = useSelector((state) => state.cart);
	const { currentUser } = useSelector((state) => state.auth);
	const token = currentUser?.token;
	const user = currentUser?.user;

	const dispatch = useDispatch();

	const handleClear = () => {
		dispatch(clearCart());
	};

	const handleReactToPrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const newSale = {
		user: user._id,
		products: products.map((item) => ({
			product: item._id,
			productName: item.productName,
			desc: item.desc,
			img: item.img,
			price: item.price,
			quantity: item.qty,
		})),
		quantity,
		total,
	};

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const handlePrint = async () => {
		setLoading(true);
		try {
			const res = await makeRequest.post("/sales", newSale, config);

			if (res.status === 200 && user) {
				handleReactToPrint();
				setData(res.data);
				setLoading(false);
				toast.success("Order successfully created", { theme: "colored" });
				dispatch(clearCart());
			}
		} catch (error) {
			setLoading(false);
			toast.error("Error creating Order!", { theme: "colored" });
			console.log(error);
		}
	};

	return (
		<div className="rightBar" style={{ display: type && "none" }}>
			<div style={{ display: "none" }}>
				<ComponentToPrint
					ref={componentRef}
					products={products}
					quantity={quantity}
					total={total}
					user={user}
					orderId={data?._id}
					createdAt={data?.createdAt}
				/>
			</div>
			{products.length > 0 ? (
				<div className="container">
					<h2>Current Order (VAT inclusive)</h2>
					<div className="catsContainer">
						<div className="cats">
							{products.map((product, key) => (
								<CatItem key={key} product={product} />
							))}
						</div>
						<hr className="line" />
						<div className="total">
							<div className="item" style={{ fontWeight: "bold" }}>
								<span className="key">TOTAL ({quantity})</span>
								<span
									className="value"
									style={{ color: "green", fontWeight: "bold" }}
								>
									${total?.toFixed(2)}
								</span>
							</div>
						</div>
						<button onClick={handlePrint}>
							{loading ? <Loader /> : "CHECK OUT"}
						</button>
						<button className="clearCart" onClick={handleClear}>
							CLEAR CART
						</button>
					</div>
				</div>
			) : (
				<span className="addedItems">Added Items will show here.</span>
			)}
		</div>
	);
};

export default RightBar;
