import {
	loginRequest,
	loginSuccess,
	loginFailure,
} from "../reducers/AuthRedux";
import { makeRequest } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { getProfile } from "./ProfileApi";
import {
	createUserFailure,
	createUserRequest,
	createUserSuccess,
	getUsersFailure,
	getUsersRequest,
	getUsersSuccess,
	removeUser,
	updateUserFailure,
	updateUserRequest,
	updateUserSuccess,
} from "../reducers/UserRedux";

const login = (inputs) => async (dispatch) => {
	loginRequest();
	try {
		const res = await makeRequest.post("/auth/login", inputs);
		if (res.status === 200) {
			dispatch(getProfile());
			dispatch(loginSuccess(res.data));
			toast.success("Login Successfull", { theme: "colored" });
		}
	} catch (err) {
		if (err && err.response.data) {
			toast.error(err.response.data, { theme: "colored" });
			dispatch(loginFailure(err.response.data));
			console.log(err);
		}
	}
};

const getUsers = () => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	getUsersRequest();
	try {
		const res = await makeRequest.get("/users", config);
		if (res.status === 200) {
			dispatch(getUsersSuccess(res.data));
		}
	} catch (err) {
		dispatch(getUsersFailure());
		console.log(err);
	}
};

const createteUser = (inputs) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	createUserRequest();
	try {
		const res = await makeRequest.post(`/users/`, inputs, config);
		if (res.status === 200) {
			dispatch(createUserSuccess(res.data));
			toast.success("Cashier created.", { theme: "colored" });
		}
	} catch (err) {
		dispatch(createUserFailure());
		console.log(err);
	}
};

const updateUser = (id, inputs) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	updateUserRequest();
	try {
		const res = await makeRequest.put(`/users/${id}`, inputs, config);
		if (res.status === 200) {
			dispatch(updateUserSuccess(res.data));
			toast.success("User updated.", { theme: "colored" });
		}
	} catch (err) {
		dispatch(updateUserFailure());
		console.log(err);
	}
};

const deleteUser = (id) => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};
	try {
		const res = await makeRequest.delete(`/users/${id}`, config);
		if (res.status === 200) {
			dispatch(removeUser(res.data));
			toast.success(res.data, { theme: "colored" });
		}
	} catch (err) {
		console.log(err);
	}
};

export { login, getUsers, createteUser, updateUser, deleteUser };
