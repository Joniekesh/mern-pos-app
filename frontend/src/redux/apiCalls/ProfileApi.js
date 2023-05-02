import { makeRequest } from "../../utils/axiosInstance";
import { getUserProfile } from "../reducers/ProfileRedux";

const getProfile = () => async (dispatch, getState) => {
	const {
		auth: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};

	try {
		const res = await makeRequest.get("/auth", config);
		if (res.status === 200) {
			dispatch(getUserProfile(res.data));
		}
	} catch (err) {
		console.log(err);
	}
};

export { getProfile };
