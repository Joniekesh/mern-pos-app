import { useSelector } from "react-redux";
import "./transactions.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Transactions = () => {
	const navigate = useNavigate();

	return <div className="transactions">Transactions</div>;
};

export default Transactions;
