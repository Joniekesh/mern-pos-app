import { useNavigate } from "react-router-dom";
import "./orders.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSales } from "../../../redux/apiCalls/SalesApiCalls";
import Loader from "../../../components/loader/Loader";

const Orders = () => {
	const { profile } = useSelector((state) => state.profile);
	const { allSales, loading } = useSelector((state) => state.sale);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		profile && !profile.isAdmin && navigate("/");
	}, []);

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
												<span className="cashierName">{sale.user?.name}</span>
											</div>
										</td>
										<td>{new Date(sale.createdAt).toLocaleString()}</td>
										<td className="amount">$ {sale.total}</td>
										<td>
											<span className="view">View</span>
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
