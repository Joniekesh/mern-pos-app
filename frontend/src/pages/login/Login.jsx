import { useEffect, useState } from "react";
import "./login.scss";
import { BsCartCheckFill, BsPersonCircle } from "react-icons/bs";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls/UserApiCalls";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ip, setIP] = useState("");

	const getData = async () => {
		const res = await axios.get("https://api.ipify.org/?format=json");
		console.log(res.data);
		setIP(res.data.ip);
	};

	useEffect(() => {
		//passing getData method to the lifecycle method
		getData();
	}, []);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { currentUser, loading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (currentUser?.user) {
			navigate("/");
		}
	}, [currentUser?.user]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login({ email, password, ipAddress: ip }));

		navigate("/");
	};

	return (
		<div className="login">
			<div className="container">
				<div className="top">
					<div className="logoContainer">
						<BsCartCheckFill style={{ fontSize: "24px" }} />
						<h2 className="logo">joniePOS</h2>
					</div>
				</div>
				<div className="bottom">
					<div className="icon">
						<BsPersonCircle />
					</div>
					<form onSubmit={submitHandler}>
						<div className="inputContainer">
							<label>Email</label>
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="inputContainer">
							<label>Password</label>
							<input
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button type="submit" disabled={!email || !password}>
							{loading ? <Loader /> : "Login"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
