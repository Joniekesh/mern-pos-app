import "./printItem.scss";

const PrintItem = ({ product }) => {
	return (
		<div className="printItem">
			<span className="producTitle">{product.productName}</span>
			<span className="calc">{product.quantity}</span>
			<span className="productPrice">$ {product.price.toFixed(2)}</span>
			<span className="productPrice">
				$ {(product.price * product.quantity).toFixed(2)}
			</span>
		</div>
	);
};

export default PrintItem;
