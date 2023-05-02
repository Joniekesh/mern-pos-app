import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		user: null,
		loading: false,
		error: null,
	},
	reducers: {
		getUsersRequest: (state) => {
			state.loading = true;
		},
		getUsersSuccess: (state, action) => {
			state.users = action.payload;
		},
		getUsersFailure: (state, action) => {
			state.error = action.payload;
		},
		createUserRequest: (state) => {
			state.loading = true;
		},
		createUserSuccess: (state, action) => {
			state.users.push(action.payload);
		},
		createUserFailure: (state, action) => {
			state.error = action.payload;
		},
		updateUserRequest: (state) => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.users.push(action.payload);
		},
		updateUserFailure: (state, action) => {
			state.error = action.payload;
		},
		removeUser: (state, action) => {
			state.users.splice(
				state.users.findIndex((user) => user._id === action.payload._id),
				1
			);
		},
	},
});

export const {
	getUsersRequest,
	getUsersSuccess,
	getUsersFailure,
	createUserRequest,
	createUserSuccess,
	createUserFailure,
	updateUserRequest,
	updateUserSuccess,
	updateUserFailure,
	removeUser,
} = userSlice.actions;
export default userSlice.reducer;
