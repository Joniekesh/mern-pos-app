import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxLength: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			maxLength: 100,
		},
		DoB: {
			type: String,
			maxLength: 100,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		img: {
			type: String,
		},
		password: {
			type: String,
			minLength: 6,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		guarantorName: {
			type: String,
			maxLength: 30,
		},
		guarantorAddress: {
			type: String,
			maxLength: 100,
		},
		guarantorPhone: {
			type: String,
		},
		ipAddress: {
			type: String,
		},
	},

	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSaltSync(10);
	this.password = await bcrypt.hashSync(this.password, salt);

	next();
});

export default mongoose.model("User", UserSchema);
