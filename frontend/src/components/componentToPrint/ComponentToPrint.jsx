import React from "react";
import "./componentToPrint.scss";
import PrintItem from "../printItem/PrintItem";

export const ComponentToPrint = React.forwardRef((props, ref) => {
	const { products, quantity, total, user, orderId, createdAt } = props;

	return (
		<div ref={ref}>
			<div className="componentToPrint">
				<div className="top">
					<div className="companyInfo">
						<h1>JONIE DEV STORES</h1>
						<h2>JONIE DEV DRIVE,JONIE DEV CITY</h2>
						<h3>www.joniedevstores.com</h3>
						<h2>+123 456 789</h2>
					</div>
					<div className="iCashierDetails">
						<div className="invoiceDetails">
							<div className="iLeft">
								<span style={{ fontSize: "20px" }}>Invoice ID: {orderId}</span>
							</div>
							<div className="iRight" style={{ fontSize: "20px" }}>
								(VAT inclusive)
							</div>
						</div>
						<div className="userInfo">
							<h2>Cashier:</h2>
							<div className="userDetails">
								<span className="username">{user?.name}</span>
								<span className="phone">{user?.phone}</span>
							</div>
						</div>
					</div>
					<h2>SOLD ON: {new Date(createdAt).toLocaleString()}</h2>
				</div>
				<div className="bottom">
					<div className="listTop">
						<h2>ITEM</h2>
						<h2>QTY</h2>
						<h2>PRICE</h2>
						<h2>AMOUNT</h2>
					</div>

					<div className="cats">
						{products?.map((product, key) => (
							<PrintItem key={key} product={product} />
						))}
					</div>
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
			</div>
		</div>
	);
});
