import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		profile: null,
	},
	reducers: {
		getUserProfile: (state, action) => {
			state.profile = action.payload;
		},
		clearProfile: (state) => {
			state.profile = null;
		},
	},
});

export const { getUserProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
