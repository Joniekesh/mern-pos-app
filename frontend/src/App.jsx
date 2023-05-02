import "./global.scss";

import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Cashiers from "./pages/admin/cashiers/Cashiers";
import Products from "./pages/admin/products/Products";
import Orders from "./pages/admin/orders/Orders";
import { useEffect } from "react";
import { getProfile } from "./redux/apiCalls/ProfileApi";
import Transactions from "./pages/admin/transactions/Transactions";
import SingleProduct from "./pages/admin/singleProduct/SingleProduct";
import CreateProduct from "./pages/admin/createProduct/CreateProduct";
import CreateCashier from "./pages/admin/createCashier/CreateCashier";
import SingleCashier from "./pages/admin/singleCashier/SingleCashier";
import CashierOrders from "./pages/cashierOrders/CashierOrders";

const App = () => {
	const dispatch = useDispatch();

	const { currentUser } = useSelector((state) => state.auth);

	const user = currentUser?.user;

	const { darkMode } = useSelector((state) => state.theme);

	const PrivateRoute = ({ children }) => {
		return user ? children : <Navigate to="/login" />;
	};

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};

	const Layout = () => {
		return (
			<>
				<div>
					<ToastContainer />
				</div>
				<div className={`theme-${darkMode ? "dark" : "light"}`}>
					<NavBar />
					{user && user.isAdmin ? (
						<div style={{ display: "flex" }}>
							<LeftBar />
							<div style={{ flex: 6 }}>
								<Outlet />
							</div>
						</div>
					) : (
						<div style={{ display: "flex" }}>
							<div style={{ flex: 6 }}>
								<Outlet />
							</div>
							<RightBar />
						</div>
					)}
				</div>
			</>
		);
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<PrivateRoute>
					<Layout />
				</PrivateRoute>
			),
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/dashboard",
					element: <Dashboard />,
				},
				{
					path: "/dashboard/orders",
					element: <Orders />,
				},
				{
					path: "/dashboard/products",
					element: <Products />,
				},
				{
					path: "/dashboard/cashiers",
					element: <Cashiers />,
				},
				{
					path: "/dashboard/transactions",
					element: <Transactions />,
				},
				{
					path: "/dashboard/products/:id",
					element: <SingleProduct />,
				},
				{
					path: "/dashboard/cashiers/:id",
					element: <SingleCashier />,
				},
				{
					path: "/dashboard/products/create",
					element: <CreateProduct />,
				},
				{
					path: "/dashboard/cashiers/create",
					element: <CreateCashier />,
				},
				{
					path: "/cashiers/orders/:id",
					element: <CashierOrders />,
				},
			],
		},

		{
			path: "/login",
			element: <Login />,
		},
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
