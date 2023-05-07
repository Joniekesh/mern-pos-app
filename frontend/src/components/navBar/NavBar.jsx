import { useState } from "react";
import "./navBar.scss";
import { BsSearch, BsBell, BsSun, BsMoon } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/AuthRedux";
import { clearProfile } from "../../redux/reducers/ProfileRedux";
import { useNavigate } from "react-router-dom";
import { setDarkMode } from "../../redux/reducers/DarkModeRedux";
import { getProducts } from "../../redux/apiCalls/ProductApi";
import { clearCart } from "../../redux/reducers/CartRedux";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [open, setOpen] = useState(false);

	const [query, setQuery] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { darkMode } = useSelector((state) => state.theme);
	const { currentUser } = useSelector((state) => state.auth);
	const user = currentUser?.user;

	// console.log(new Date(user.createdAt).toLocaleString());

	const handleLogout = () => {
		dispatch(logout());
		dispatch(clearProfile());
		dispatch(clearProfile());
		dispatch(clearCart());
		localStorage.removeItem("token");
		navigate("/login");
	};

	const toggle = () => {
		dispatch(setDarkMode(!darkMode));
	};

	const handleClick = () => {
		dispatch(getProducts(query));
	};

	const handleNavigate = () => {
		navigate("/dashboard");
		setOpen(false);
	};

	const handleOrdersNavigate = () => {
		navigate(`/cashiers/orders/me`);
		setOpen(false);
	};

	return (
		<div className="navBar">
			<div className="container">
				<Link to="/" className="link">
					<BiHomeAlt style={{ fontSize: "24px" }} />
				</Link>
				<div className="left">
					<div className="search">
						<span>
							<BsSearch />
						</span>
						<input
							type="text"
							placeholder="Search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button
							className="searchBtn"
							disabled={!query}
							onClick={handleClick}
						>
							Search
						</button>
					</div>
				</div>
				<div className="right">
					{darkMode ? (
						<span className="icon">
							<BsSun onClick={toggle} />
						</span>
					) : (
						<span className="icon">
							<BsMoon onClick={toggle} />
						</span>
					)}

					<span className="icon">
						<BsBell />
					</span>
					<img src="/upload/pos-bg3.jpeg" alt="" />
					<div className="userInfo">
						<span className="welcome">Welcome, {user?.name.split(" ")[0]}</span>
						{user && !user.isAdmin && (
							<span className="cashier">Cashier on groceries</span>
						)}
					</div>
					<span className="icon" onClick={() => setOpen(!open)}>
						<RxCaretDown />
					</span>
					{open && (
						<div className="dropDown">
							{user.isAdmin ? (
								<button className="dashBtn" onClick={handleNavigate}>
									Admin Dashboard
								</button>
							) : (
								<button
									className="dashBtn"
									onClick={() => handleOrdersNavigate()}
								>
									View Your Sales
								</button>
							)}
							<button className="logoutBtn" onClick={handleLogout}>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
