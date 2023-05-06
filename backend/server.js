import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import saleRoute from "./routes/sale.js";
import notificationRoute from "./routes/notification.js";

import connectDB from "./config/db.js";
import multer from "multer";

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../frontend/public/upload");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
	const file = req.file;
	res.status(200).json(file.filename);
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/sales", saleRoute);
app.use("/api/notifications", notificationRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(
		`SERVER running in ${process.env.NODE_ENV} MODE on PORT ${PORT} `.bold.cyan
			.underline
	)
);
