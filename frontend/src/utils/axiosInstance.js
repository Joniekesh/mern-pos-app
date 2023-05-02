import axios from "axios";

export const makeRequest = axios.create({
	baseURL: "https:mern-pos-app.onrender.com/api",
});
// baseURL: "http://localhost:5000/api",
