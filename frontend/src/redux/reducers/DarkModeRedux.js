import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
	name: "theme",
	initialState: {
		darkMode: false,
	},
	reducers: {
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
		},
	},
});

export const { setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
