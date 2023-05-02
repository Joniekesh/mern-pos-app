import User from "../models/User.js";

// create user (Admin only)
const createUser = async (req, res) => {
	const {
		name,
		email,
		address,
		DoB,
		password,
		phone,
		img,
		guarantorName,
		guarantorAddress,
		guarantorPhone,
		isAdmin,
	} = req.body;
	const newUser = new User({
		name,
		email,
		address,
		DoB,
		password,
		phone,
		img,
		guarantorName,
		guarantorAddress,
		guarantorPhone,
		isAdmin,
	});

	if (
		!name ||
		!email ||
		!address ||
		!address ||
		!DoB ||
		!phone ||
		!password ||
		!img ||
		!guarantorName ||
		!guarantorAddress ||
		!guarantorPhone
	) {
		return res.status(400).json("All inputs are required.");
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json("Password of 6 or more characters is requires.");
	}
	try {
		const users = await User.find();

		if (users.some((user) => user.email === email)) {
			return res.status(400).json(`A user with email: ${email} already exists`);
		}

		if (users.some((user) => user.phone === phone)) {
			return res.status(400).json(`A user with phone: ${phone} already exists`);
		}

		const createdUser = await newUser.save();

		const { password, ...others } = createdUser._doc;

		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
};

// update user (Admin only)
const updateUser = async (req, res) => {
	const {
		name,
		email,
		password,
		address,
		DoB,
		phone,
		isAdmin,
		img,
		guarantorName,
		guarantorAddress,
		guarantorPhone,
	} = req.body;

	try {
		const user = await User.findById(req.params.id);

		if (user) {
			user.name = name || user.name;
			user.email = email || user.email;
			user.phone = phone || user.phone;
			user.address = address || user.address;
			user.DoB = DoB || user.DoB;
			user.img = img || user.img;
			user.guarantorName = guarantorName || user.guarantorName;
			user.guarantorAddress = guarantorAddress || user.guarantorAddress;
			user.guarantorPhone = guarantorPhone || user.guarantorPhone;
			user.isAdmin = isAdmin;

			if (password) {
				user.password = password || user.password;
			}
		}

		const updatedUser = await user.save();
		res.status(200).json(updatedUser);
	} catch (err) {
		console.log(err);
	}
};

// get all users (Admin only)
const getUsers = async (req, res) => {
	try {
		const users = await User.find();

		if (!users) return res.status(404).json("Users not found.");

		res.status(200).json(users);
	} catch (err) {
		console.log(err);
	}
};

// get user by id (Admin only)
const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) return res.status(404).json("User not found.");

		res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}
};

// delete user (Admin only)
const deletUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);

		res.status(200).json("User Deleted.");
	} catch (err) {
		console.log(err);
	}
};

export { updateUser, getUsers, getUser, createUser, deletUser };
