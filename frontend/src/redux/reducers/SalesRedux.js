import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
	name: "sale",
	initialState: {
		allSales: [],
		latestSales: [],
		cashierSales: [],
		sale: null,
		loading: false,
		error: null,
	},
	reducers: {
		getLatestSalesRequest: (state) => {
			state.loading = true;
		},
		getLatestSalesSuccess: (state, action) => {
			state.loading = false;
			state.latestSales = action.payload;
		},
		getLatestSalesFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getAllSalesRequest: (state) => {
			state.loading = true;
		},
		getAllSalesSuccess: (state, action) => {
			state.loading = false;
			state.allSales = action.payload;
		},
		getAllSalesFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getCashierSalesRequest: (state) => {
			state.loading = true;
		},
		getCashierSalesSuccess: (state, action) => {
			state.loading = false;
			state.cashierSales = action.payload;
		},
		getCashierSalesFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	getLatestSalesRequest,
	getLatestSalesSuccess,
	getLatestSalesFailure,
	getAllSalesRequest,
	getAllSalesSuccess,
	getAllSalesFailure,
	getCashierSalesRequest,
	getCashierSalesSuccess,
	getCashierSalesFailure,
} = salesSlice.actions;
export default salesSlice.reducer;
