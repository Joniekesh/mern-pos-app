import { useState } from "react";
import "./createCashier.scss";
import { makeRequest } from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { createteUser } from "../../../redux/apiCalls/UserApiCalls";

const CreateCashier = () => {
	const [file, setFile] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading } = useSelector((state) => state.user);

	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		address: "",
		DoB: "",
		phone: "",
		password: "",
		confirmPassword: "",
		guarantorName: "",
		guarantorPhone: "",
		guarantorAddress: "",
	});

	const {
		name,
		email,
		address,
		DoB,
		phone,
		password,
		confirmPassword,
		guarantorName,
		guarantorAddress,
		guarantorPhone,
	} = inputs;

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await makeRequest.post("/upload", formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return toast.error("Passwords do not match.", { theme: "colored" });
		}

		if (
			!name ||
			!email ||
			!address ||
			!DoB ||
			!phone ||
			!password ||
			!confirmPassword ||
			!guarantorName ||
			!guarantorAddress ||
			!guarantorPhone ||
			!file
		) {
			return toast.error("All inputs marked asteriks are required.", {
				theme: "colored",
			});
		}

		let imgUrl = "";
		if (file) imgUrl = await upload();

		const newCashier = {
			img: imgUrl,
			name,
			email,
			address,
			DoB,
			phone,
			password,
			confirmPassword,
			guarantorName,
			guarantorAddress,
			guarantorPhone,
			isAdmin,
		};

		dispatch(createteUser(newCashier));
		navigate("/dashboard/cashiers");
	};

	return (
		<div className="createCashier">
			<div className="createCashierContainer">
				<h2>New Cashier</h2>
				<form onSubmit={submitHandler}>
					<div className="formInput">
						<label>Image *</label>
						<input type="file" onChange={(e) => setFile(e.target.files[0])} />
					</div>
					<div className="formInput">
						<label>Name *</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Email *</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Cashier Address *</label>
						<input
							type="text"
							name="address"
							value={address}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Date of Birth *</label>
						<input type="date" name="DoB" value={DoB} onChange={handleChange} />
					</div>
					<div className="formInput">
						<label>Phone *</label>
						<input
							type="text"
							name="phone"
							value={phone}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Password *</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Confirm Password *</label>
						<input
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Guarantor Name *</label>
						<input
							type="text"
							name="guarantorName"
							value={guarantorName}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Guarantor Address *</label>
						<input
							type="text"
							name="guarantorAddress"
							value={guarantorAddress}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Guarantor Phone *</label>
						<input
							type="text"
							name="guarantorPhone"
							value={guarantorPhone}
							onChange={handleChange}
						/>
					</div>
					<div className="formInput checkboxInput">
						<label>Is Admin</label>
						<input
							type="checkbox"
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						/>
					</div>
					<button type="submit">{loading ? <Loader /> : "Create"}</button>
				</form>
			</div>
		</div>
	);
};

export default CreateCashier;
