import { useNavigate } from "react-router-dom";
import "./orders.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteSale, getAllSales } from "../../../redux/apiCalls/SalesApiCalls";
import Loader from "../../../components/loader/Loader";

const Orders = () => {
	const { allSales, loading } = useSelector((state) => state.sale);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleNavigate = (sale) => {
		navigate(`/orders/${sale._id}`, { state: sale });
	};

	useEffect(() => {
		dispatch(getAllSales());
	}, [dispatch]);

	return (
		<div className="orders">
			<div className="ordersContainer">
				<div className="top">
					<h2>All Orders</h2>
				</div>
				{loading ? (
					<Loader />
				) : allSales.length > 0 ? (
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
								{allSales.map((sale) => (
									<tr key={sale._id}>
										<td>{sale._id}</td>
										<td>
											<div className="cashierInfo">
												<img
													src={"/upload/" + sale.user?.img}
													alt=""
													className="image"
												/>
												<span
													style={{
														color: "teal",
														fontWeight: "bold",
														fontSize: "16px",
													}}
													className="cashierName"
												>
													{sale.user?.name}
												</span>
											</div>
										</td>
										<td>{new Date(sale.createdAt).toLocaleString()}</td>
										<td className="amount">$ {sale.total.toFixed()}</td>
										<td>
											<span
												className="view"
												onClick={() => handleNavigate(sale)}
											>
												View
											</span>
											{/* <span
												style={{ cursor: "pointer" }}
												onClick={() => dispatch(deleteSale(sale._id))}
											>
												delete
											</span> */}
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

export default Orders;
