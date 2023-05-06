import Notification from "../models/Notification.js";

// create notification
const createNotification = async (req, res) => {
	const newNotification = new Notification({
		user: req.user.id,
		title: req.body.title,
		text: req.body.text,
	});
	try {
		const createdNotification = await newNotification.save();

		res.status(200).json(createdNotification);
	} catch (error) {
		res.status(500).json("Server Error");
	}
};

export { createNotification };
