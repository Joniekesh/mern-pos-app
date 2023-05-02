import User from "../models/User.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json("No token! Authorization denied.");
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select("-password");
			next();
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).json("You are not authorized to access this route");
	}
};

export { protect, admin };
