import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "product",
	initialState: {
		products: [],
		product: {},
		loading: false,
		error: null,
	},
	reducers: {
		getProductsRequest: (state) => {
			state.loading = true;
		},
		getProductsSuccess: (state, action) => {
			state.products = action.payload;
			state.loading = false;
		},
		getProductsFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		getProductRequest: (state) => {
			state.loading = true;
		},
		getProductSuccess: (state, action) => {
			state.product = action.payload;
			state.loading = false;
		},
		getProductFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		createProductRequest: (state) => {
			state.loading = true;
		},
		createProductSuccess: (state, action) => {
			state.products.push(action.payload);
			state.loading = false;
		},
		createProductFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		updateProductSuccess: (state, action) => {
			state.products.push(action.payload);
			state.loading = false;
		},
		removeProduct: (state, action) => {
			state.products.splice(
				state.products.findIndex(
					(product) => product._id === action.payload._id
				),
				1
			);
		},
	},
});

export const {
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
} = productSlice.actions;
export default productSlice.reducer;
