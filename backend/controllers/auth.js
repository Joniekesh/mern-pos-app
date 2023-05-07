import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
const register = async (req, res) => {
	const { name, email, address, phone, img, password } = req.body;
	const newUser = new User({
		name,
		email,
		address,
		phone,
		img,
		password,
	});

	if (!name || !email || !address || !phone || !img || !password) {
		return res.status(400).json("All input fields are required.");
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json("Password of 6 or more characters is requires.");
	}
	try {
		const user = await User.findOne({ email });

		if (user)
			return res
				.status(400)
				.json(`A user with email: ${user.email} already exists.`);

		const createdUser = await newUser.save();

		res.status(200).json(createdUser);
	} catch (err) {
		res.status(500).json(err);
	}
};

// login user
const login = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) return res.status(400).json("Invalid email/Password");

		const isMatch = await bcrypt.compareSync(req.body.password, user.password);

		if (!isMatch) return res.status(400).json("Invalid email/password");

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

		const { password, ...others } = user._doc;

		res.status(200).json({ user: others, token });
	} catch (err) {
		res.status(500).json(err);
	}
};

// get logged in user
const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

export { register, login, getProfile };
