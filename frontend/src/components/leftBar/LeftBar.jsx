import { useState } from "react";
import "./leftBar.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiHomeAlt, BiCube } from "react-icons/bi";
import { BsPeopleFill, BsSun, BsMoon } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { SiSimpleanalytics } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../redux/reducers/DarkModeRedux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LeftBar = () => {
	const [selected, setSelected] = useState(1);
	const { darkMode } = useSelector((state) => state.theme);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSelect = (link) => {
		setSelected(link.id);
		navigate(link.redirect);
	};

	const toggle = () => {
		dispatch(setDarkMode(!darkMode));
	};

	const links = [
		{
			id: 1,
			icon: <BiHomeAlt />,
			title: "Dashboard",
			redirect: "/dashboard",
		},
		{
			id: 2,
			icon: <BiCube />,
			title: "Products",
			redirect: "/dashboard/products",
		},

		{
			id: 3,
			icon: <AiOutlineShoppingCart />,
			title: "Orders",
			redirect: "/dashboard/orders",
		},
		{
			id: 4,
			icon: <BsPeopleFill />,
			title: "Cashiers",
			redirect: "/dashboard/cashiers",
		},
		{
			id: 5,
			icon: <GrTransaction />,
			title: "Transactions",
			redirect: "/dashboard/transactions",
		},
		{
			id: 6,
			icon: <SiSimpleanalytics />,
			title: "Analytics",
			redirect: "/dashboard",
		},
	];

	return (
		<div className="leftBar">
			<Link to="/" className="link">
				<div className="logoContainer">
					{/* <h3>jonieDev stores.</h3> */}
					<h3>JD stores.</h3>
				</div>
			</Link>
			<div className="navs">
				{links.map((link) => (
					<div
						className={selected === link.id ? "linkItem active" : "linkItem"}
						key={link.id}
						onClick={() => handleSelect(link)}
					>
						<span className="icon">{link.icon}</span>
						<span className="title">{link.title}</span>
					</div>
				))}
			</div>
			<div className="theme">
				{darkMode ? (
					<span className="icon">
						<BsSun onClick={toggle} />
					</span>
				) : (
					<span className="icon">
						<BsMoon onClick={toggle} />
					</span>
				)}
				<span className="mode">{darkMode ? "Light Mode" : "Dark Mode"}</span>
			</div>
		</div>
	);
};

export default LeftBar;
