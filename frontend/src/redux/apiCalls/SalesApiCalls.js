import { toast } from "react-toastify";
import { makeRequest } from "../../utils/axiosInstance";
import {
	getAllSalesFailure,
	getAllSalesRequest,
	getAllSalesSuccess,
	getCashierSalesFailure,
	getCashierSalesRequest,
	getCashierSalesSuccess,
	getLatestSalesFailure,
	getLatestSalesRequest,
	getLatestSalesSuccess,
	removeSale,
} from "../reducers/SalesRedux";

const getLatestSales = () => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	dispatch(getLatestSalesRequest());
	try {
		const res = await makeRequest.get("/sales/latest", config);
		if (res.status === 200) {
			dispatch(getLatestSalesSuccess(res.data));
		}
	} catch (err) {
		console.log(err);
		toast.error("Something went wrong!", { theme: "colored" });
	}
};

const getAllSales = () => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	dispatch(getAllSalesRequest());
	try {
		const res = await makeRequest.get("/sales", config);
		if (res.status === 200) {
			dispatch(getAllSalesSuccess(res.data));
		}
	} catch (err) {
		console.log(err);
		dispatch(getAllSalesFailure());

		toast.error("Something went wrong!", { theme: "colored" });
	}
};

const getCashierSales = () => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	dispatch(getCashierSalesRequest());
	try {
		const res = await makeRequest.get(`/sales/me`, config);
		if (res.status === 200) {
			dispatch(getCashierSalesSuccess(res.data));
		}
	} catch (err) {
		console.log(err);
		dispatch(getCashierSalesFailure());

		toast.error("Something went wrong!", { theme: "colored" });
	}
};

const deleteSale = (id) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	try {
		const res = await makeRequest.delete(`/sales/${id}`, config);
		if (res.status === 200) {
			dispatch(removeSale(res.data));
			toast.success(res.data, { theme: "colored" });
		}
	} catch (err) {
		console.log(err);

		toast.error("Something went wrong!", { theme: "colored" });
	}
};

export { getLatestSales, getAllSales, getCashierSales, deleteSale };
