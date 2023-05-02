import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
	name: "auth",
	initialState: {
		currentUser: null,
		loading: false,
		error: null,
	},
	reducers: {
		loginRequest: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
		},
		loginFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		logout: (state) => {
			state.currentUser = null;
			state.loading = false;
			state.error = null;
		},
	},
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
	loginSlice.actions;
export default loginSlice.reducer;
