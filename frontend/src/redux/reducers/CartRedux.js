import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;

			let foundProduct = state.products.find(
				(product) => product._id === item._id
			);

			if (foundProduct) {
				foundProduct.qty++;
				state.quantity = state.quantity;
				state.total += foundProduct.price;
			} else {
				state.products.push({ ...item, qty: item.qty + 1 });
				state.total += item.price * (item.qty + 1);
				state.quantity += 1;
			}
		},
		removeFromCart: (state, action) => {
			const item = action.payload;
			const foundProduct = state.products.find(
				(product) => product._id === item._id
			);
			if (foundProduct) {
				state.products.splice(
					state.products.findIndex((product) => product._id === item._id),
					1
				);
				state.total -= foundProduct.price * foundProduct.qty;
				state.quantity -= 1;
			}
		},
		decreaseCart: (state, action) => {
			const item = action.payload;
			const foundProduct = state.products.find(
				(product) => product._id === item._id
			);

			if (foundProduct.qty > 1) {
				foundProduct.qty -= 1;
				state.total -= foundProduct.price;
			} else {
				state.products.splice(
					state.products.findIndex((product) => product._id === item._id),
					1
				);
				state.total -= foundProduct.price * foundProduct.qty;
				state.quantity -= 1;
			}
		},
		increaseCart: (state, action) => {
			const item = action.payload;
			const foundProduct = state.products.find(
				(product) => product._id === item._id
			);

			if (foundProduct.qty > 1) {
				foundProduct.qty += 1;
				state.total += foundProduct.price;
			}
		},
		clearCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	decreaseCart,
	increaseCart,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
