import React from "react";
import "./componentToPrint.scss";

export const ComponentToPrint = React.forwardRef((props, ref) => {
	const { products, quantity, total, user, orderId, createdAt } = props;

	return (
		<div className="componentToPrint" ref={ref}>
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
								<span style={{ fontSize: "18px" }}>Invoice ID: {orderId}</span>
							</div>
							<div className="iRight" style={{ fontSize: "20px" }}>
								(VAT inclusive)
							</div>
						</div>
						<div className="userInfo">
							<h2>Cashier:</h2>
							<div className="userDetails">
								<span className="username">{user.name}</span>
								<span className="phone">{user.phone}</span>
							</div>
						</div>
					</div>
					<p className="date">
						SOLD ON: {new Date(createdAt).toLocaleString()}
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
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.productName}</td>
									<td>{product.quantity}</td>
									<td className="amount">$ {product.price.toFixed(2)}</td>
									<td>$ {(product.price * product.quantity).toFixed(2)}</td>
								</tr>
							))}
							<tr className="total">
								<span className="value">GRAND TOTAL ({quantity})</span>
								<h2 className="amount">$ {total.toFixed()}</h2>
							</tr>
						</tbody>
					</table>
				</div>
				{/* <button onClick={handlePrint}>Print</button> */}
			</div>
		</div>
	);
});
