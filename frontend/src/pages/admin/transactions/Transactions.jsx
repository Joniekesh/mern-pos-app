import { useSelector } from "react-redux";
import "./transactions.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Transactions = () => {
	const { profile } = useSelector((state) => state.profile);

	const navigate = useNavigate();

	useEffect(() => {
		profile && !profile.isAdmin && navigate("/");
	}, []);

	return <div className="transactions">Transactions</div>;
};

export default Transactions;
