import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import "./singleCashier.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaUserAlt, FaAddressCard } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { BsCalendarDate, BsTelephoneForward } from "react-icons/bs";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../../utils/axiosInstance";
import { updateUser } from "../../../redux/apiCalls/UserApiCalls";
import { toast } from "react-toastify";

const SingleCashier = () => {
	const { state } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [file, setFile] = useState(null);
	const [isAdmin, setIsAdmin] = useState(state?.isAdmin);

	const [inputs, setInputs] = useState({
		name: state?.name,
		email: state?.email,
		address: state?.address,
		DoB: state?.DoB,
		phone: state?.phone,
		password: "",
		confirmPassword: "",
		guarantorName: state?.guarantorName,
		guarantorPhone: state?.guarantorPhone,
		guarantorAddress: state?.guarantorAddress,
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
			return toast.error("Passwords do not match", { theme: "colored" });
		}

		let imgUrl = "";
		if (file) imgUrl = await upload();

		const updatedUser = {
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
			img: imgUrl || state.img,
			isAdmin,
		};

		dispatch(updateUser(state._id, updatedUser));
		navigate("/dashboard/cashiers");
	};

	return (
		<div className="singleCashier">
			<div className="singleCashierContainer">
				<div className="action">
					<h2>Edit Cashier</h2>
					<Link to="/dashboard/cashiers/create" className="link">
						<button>
							<AiOutlinePlus />
							CREATE
						</button>
					</Link>
				</div>
				<div className="details">
					<div className="left">
						<div className="leftTop">
							<h3>Cashier Info</h3>
							<div className="user">
								{file ? (
									<img src={URL.createObjectURL(file)} alt="" />
								) : (
									<img src={"/upload/" + state?.img} alt="" />
								)}
								<div className="nameAndRole">
									<span className="uName">{state?.name}</span>
									<span className="uRole">Grocery Cashier</span>
								</div>
							</div>
							<div className="items">
								<div className="item">
									<span className="icon">
										<FaUserAlt />
									</span>
									<span className="value">{state?.name}</span>
								</div>
								<div className="item">
									<span className="icon">
										<MdAlternateEmail />
									</span>
									<span className="value">{state?.email}</span>
								</div>
								<div className="item">
									<span className="icon">
										<FaAddressCard />
									</span>
									<span className="value">{state?.address}</span>
								</div>
								<div className="item">
									<span className="icon">
										<BsCalendarDate />
									</span>
									<span className="value">{state?.DoB}</span>
								</div>
								<div className="item">
									<span className="icon">
										<BsTelephoneForward />
									</span>
									<span className="value">{state?.phone}</span>
								</div>
								<div className="item">
									<span className="icon">isAdmin</span>
									<span className="value">
										{state?.isAdmin === true ? "TRUE" : "FALSE"}
									</span>
								</div>
							</div>
						</div>
						<div className="leftBottom">
							<h3>Guarantor Info</h3>
							<div className="items">
								<div className="item">
									<span className="icon">
										<FaUserAlt />
									</span>
									<span className="value">{state?.guarantorName}</span>
								</div>

								<div className="item">
									<span className="icon">
										<FaAddressCard />
									</span>
									<span className="value">{state?.guarantorAddress}</span>
								</div>
								<div className="item">
									<span className="icon">
										<BsTelephoneForward />
									</span>
									<span className="value">{state?.guarantorPhone}</span>
								</div>
							</div>
						</div>
					</div>
					<form className="right" onSubmit={submitHandler}>
						<div className="formLeft">
							<div className="formInput">
								<label>Name</label>
								<input
									type="text"
									name="name"
									value={name}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={email}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Cashier Address</label>
								<input
									type="text"
									name="address"
									value={address}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Date of Birth</label>
								<input
									type="date"
									name="DoB"
									value={DoB}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Phone</label>
								<input
									type="text"
									name="phone"
									value={phone}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Password</label>
								<input
									type="password"
									name="password"
									// value={password}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Confirm Password</label>
								<input
									type="password"
									name="confirmPassword"
									// value={confirmPassword}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Guarantor Name</label>
								<input
									type="text"
									name="guarantorName"
									value={guarantorName}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Guarantor Address</label>
								<input
									type="text"
									name="guarantorAddress"
									value={guarantorAddress}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput">
								<label>Guarantor Phone</label>
								<input
									type="text"
									name="guarantorPhone"
									value={guarantorPhone}
									onChange={handleChange}
								/>
							</div>
							<div className="formInput checkInput">
								<label>Is Admin</label>
								<input
									type="checkbox"
									checked={isAdmin}
									onChange={(e) => setIsAdmin(e.target.checked)}
								/>
							</div>
						</div>

						<div className="formRight">
							<div className="upload">
								{file ? (
									<img src={URL.createObjectURL(file)} alt="" />
								) : (
									<img src={"/upload/" + state?.img} alt="" />
								)}
								<div className="inputDiv">
									<label htmlFor="imgId">
										<AiOutlineCloudUpload />
									</label>
									<input
										type="file"
										id="imgId"
										style={{ display: "none" }}
										onChange={(e) => setFile(e.target.files[0])}
									/>
								</div>
							</div>
							<button type="submit">Update</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SingleCashier;
