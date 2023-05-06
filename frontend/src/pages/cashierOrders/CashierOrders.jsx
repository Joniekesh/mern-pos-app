import { useDispatch, useSelector } from "react-redux";
import "./cashierOrders.scss";
import { useEffect } from "react";
import { getCashierSales } from "../../redux/apiCalls/SalesApiCalls";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const CashierOrders = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cashierSales, loading } = useSelector((state) => state.sale);

	const handleNavigate = (sale) => {
		navigate(`/orders/${sale._id}`, { state: sale });
	};

	useEffect(() => {
		dispatch(getCashierSales());
	}, [dispatch]);

	return (
		<div className="cashierOrders">
			<div className="cashierOrdersContainer">
				<h2>Your Today's Sales</h2>
				{loading ? (
					<Loader />
				) : cashierSales.length > 0 ? (
					<div className="table">
						<table>
							<thead>
								<tr>
									<th>Order ID</th>
									<th>Cashier</th>
									<th>Date</th>
									<th>Amount</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{cashierSales.map((sale) => (
									<tr key={sale._id}>
										<td>{sale._id}</td>
										<td>
											<div className="cashierInfo">
												<img
													src={"/upload/" + sale.user?.img}
													alt=""
													className="image"
												/>
												<span className="cashierName">{sale.user?.name}</span>
											</div>
										</td>
										<td>{new Date(sale.createdAt).toLocaleString()}</td>
										<td className="amount">$ {sale.total}</td>
										<td>
											<span
												className="view"
												onClick={() => handleNavigate(sale)}
											>
												View
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<span>No latest sales.</span>
				)}
			</div>
		</div>
	);
};

export default CashierOrders;
