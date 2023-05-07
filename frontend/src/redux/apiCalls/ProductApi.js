import { makeRequest } from "../../utils/axiosInstance";
import {
	getProductsRequest,
	getProductsSuccess,
	getProductsFailure,
	getProductRequest,
	getProductSuccess,
	getProductFailure,
	createProductRequest,
	createProductSuccess,
	createProductFailure,
	removeProduct,
	updateProductSuccess,
} from "../reducers/ProductRedux";
import { toast } from "react-toastify";

const getProducts = (query) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	dispatch(getProductsRequest());
	try {
		const res = await makeRequest.get(
			query ? `/products?q=${query}` : "/products",
			config
		);

		if (res.status === 200) {
			dispatch(getProductsSuccess(res.data));
		}
	} catch (err) {
		dispatch(getProductsFailure(err.response.data));
		console.log(err);
	}
};

const getProduct = (id) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	dispatch(getProductRequest());
	try {
		const res = await makeRequest.get(`/products/find/${id}`, config);

		if (res.status === 200) {
			dispatch(getProductSuccess(res.data));
		}
	} catch (err) {
		dispatch(getProductFailure());
		console.log(err);
	}
};

const createProduct = (inputs) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	dispatch(createProductRequest());
	try {
		const res = await makeRequest.post(`/products`, inputs, config);

		if (res.status === 200) {
			dispatch(createProductSuccess(res.data));
			toast.success("Product created.", { theme: "colored" });
		}
	} catch (err) {
		console.log(err);
		dispatch(createProductFailure(err.response.data));
		toast.error(err.response.data, { theme: "colored" });
	}
};

const deleteProduct = (id) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	try {
		const res = await makeRequest.delete(`/products/${id}`, config);

		if (res.status === 200) {
			dispatch(removeProduct(res.data));
			toast.success(res.data, { theme: "colored" });
		}
	} catch (err) {
		console.log(err);
	}
};

const updateProduct = (id, inputs) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	try {
		const res = await makeRequest.put(`/products/${id}`, inputs, config);

		if (res.status === 200) {
			dispatch(updateProductSuccess(res.data));
			toast.success("Product updated.", { theme: "colored" });
		}
	} catch (err) {
		console.log(err);
	}
};

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct };
