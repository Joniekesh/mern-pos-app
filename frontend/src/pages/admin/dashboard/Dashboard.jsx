import { useDispatch, useSelector } from "react-redux";
import "./dashboard.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiWavePulse1 } from "react-icons/ci";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import {
	getAllSales,
	getLatestSales,
} from "../../../redux/apiCalls/SalesApiCalls";
import Loader from "../../../components/loader/Loader";
import { getUsers } from "../../../redux/apiCalls/UserApiCalls";
import { getProducts } from "../../../redux/apiCalls/ProductApi";
import Chart from "../../../components/chart/Chart";
import { makeRequest } from "../../../utils/axiosInstance";

const Dashboard = () => {
	const [stats, setStats] = useState([]);

	// console.log(singleSale);

	const { latestSales, allSales, loading } = useSelector((state) => state.sale);
	const { users } = useSelector((state) => state.user);
	const { products } = useSelector((state) => state.product);
	const { currentUser } = useSelector((state) => state.auth);
	const token = currentUser?.token;

	let total = 0;
	allSales.map((sale) => {
		total += sale.total;
	});

	const handleNavigate = (sale) => {
		navigate(`/orders/${sale?._id}`, { state: sale });
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const MONTHS = useMemo(
		() => [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		[]
	);

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	useEffect(() => {
		const fetchStats = async () => {
			const res = await makeRequest.get("/sales/stats", config);

			if (res.status === 200) {
				res.data.map((item) => {
					return setStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], "Monthly Income": item.total },
					]);
				});
			}
		};
		fetchStats();
	}, []);

	useEffect(() => {
		dispatch(getLatestSales());
		dispatch(getAllSales());
		dispatch(getUsers());
		dispatch(getProducts);
	}, []);

	return (
		<div className="dashboard">
			<div className="dashboardContainer">
				<h2>Order Statistics</h2>
				<div className="top">
					<Link to="/dashboard/orders" className="link">
						<div className="item">
							<div className="left">
								<span className="title">Total Orders</span>
								<span className="value">{allSales.length}</span>
								<div
									className="growthPercent"
									style={{ color: "green", fontWeight: "500" }}
								>
									<span className="arrow">
										<FiArrowUp />
									</span>
									<span className="perc">1.5%</span>
								</div>
							</div>
							<div className="right">
								<CiWavePulse1 />
							</div>
						</div>
					</Link>
					<Link to="/dashboard/transactions" className="link">
						<div className="item">
							<div className="left">
								<span className="title">Total Sales</span>
								<span className="value">$ {total.toFixed(2)}</span>
								<div
									className="growthPercent"
									style={{ color: "green", fontWeight: "500" }}
								>
									<span className="arrow">
										<FiArrowUp />
									</span>
									<span className="perc">5%</span>
								</div>
							</div>
							<div className="right">
								<CiWavePulse1 />
							</div>
						</div>
					</Link>

					<Link to="/dashboard/products" className="link">
						<div className="item">
							<div className="left">
								<span className="title">Total Products</span>
								<span className="value">{products.length}</span>
								<div
									className="growthPercent"
									style={{ color: "green", fontWeight: "500" }}
								>
									<span className="arrow">
										<FiArrowUp />
									</span>
									<span className="perc">1.5%</span>
								</div>
							</div>
							<div className="right">
								<CiWavePulse1 />
							</div>
						</div>
					</Link>
					<Link to="/dashboard/cashiers" className="link">
						<div className="item">
							<div className="left">
								<span className="title">Total Cashiers</span>
								<span className="value">{users.length}</span>
								<div
									className="growthPercent"
									style={{ color: "green", fontWeight: "500" }}
								>
									<span className="arrow">
										<FiArrowUp />
									</span>
									<span className="perc">1.5%</span>
								</div>
							</div>
							<div className="right">
								<CiWavePulse1 />
							</div>
						</div>
					</Link>
				</div>
				<h2>Income Chart</h2>
				<div className="middle">
					<Chart data={stats} />
				</div>
				<div className="bottom">
					<h2>Latest Orders</h2>
					{loading ? (
						<Loader />
					) : latestSales?.length > 0 ? (
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
									{latestSales.map((sale) => (
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
						<span className="noSales">No latest sales.</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
