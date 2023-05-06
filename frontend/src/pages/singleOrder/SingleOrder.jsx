import { useLocation } from "react-router-dom";
import "./singleOrder.scss";
import { ComponentToPrint } from "../../components/componentToPrint/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const SingleOrder = () => {
	const { state } = useLocation();
	const componentRef = useRef();

	const handleReactToPrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const handlePrint = () => {
		handleReactToPrint();
	};

	return (
		<div className="singleOrder">
			<div style={{ display: "none" }}>
				<ComponentToPrint
					ref={componentRef}
					products={state?.products}
					quantity={state?.quantity}
					total={state?.total}
					user={state?.user}
					orderId={state?._id}
					createdAt={state?.createdAt}
				/>
			</div>

			<div className="singleOrderContainer">
				<div className="top">
					<div className="companyInfo">
						<h2>JONIE DEV STORES</h2>
						<h3>JONIE DEV DRIVE,JONIE DEV CITY</h3>
						<p>www.joniedevstores.com</p>
						<h2>+123 456 789</h2>
					</div>
					<div className="iCashierDetails">
						<div className="invoiceDetails">
							<div className="iLeft">
								<span style={{ fontSize: "18px" }}>
									Invoice ID: {state._id}
								</span>
							</div>
							<div className="iRight" style={{ fontSize: "20px" }}>
								(VAT inclusive)
							</div>
						</div>
						<div className="userInfo">
							<h2>Cashier:</h2>
							<div className="userDetails">
								<span className="username">{state?.user.name}</span>
								<span className="phone">{state?.user.phone}</span>
							</div>
						</div>
					</div>
					<p className="date">
						SOLD ON: {new Date(state?.createdAt).toLocaleString()}
					</p>
				</div>
				<div className="table">
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>ITEM</th>
								<th>QTY</th>
								<th>PRICE</th>
								<th>TOTAL</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{state.products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.productName}</td>
									<td>{product.quantity}</td>
									<td className="amount">$ {product.price.toFixed(2)}</td>
									<td>$ {(product.price * product.quantity).toFixed(2)}</td>
								</tr>
							))}
							<tr>
								<div className="total">
									<span className="value">GRAND TOTAL ({state.quantity})</span>
									<h2 className="amount">$ {state.total.toFixed()}</h2>
								</div>
							</tr>
						</tbody>
					</table>
				</div>
				<button onClick={handlePrint}>Print</button>
			</div>
		</div>
	);
};

export default SingleOrder;
