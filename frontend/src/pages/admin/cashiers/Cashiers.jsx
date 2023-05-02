import { useDispatch, useSelector } from "react-redux";
import "./cashiers.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Loader from "../../../components/loader/Loader";
import { deleteUser, getUsers } from "../../../redux/apiCalls/UserApiCalls";
import { BiTrashAlt } from "react-icons/bi";

const Cashiers = () => {
	const { profile } = useSelector((state) => state.profile);
	const { users, loading } = useSelector((state) => state.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleNavigate = (user) => {
		navigate(`/dashboard/cashiers/${user._id}`, { state: user });
	};

	useEffect(() => {
		profile && !profile.isAdmin && navigate("/");
	}, []);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<div className="cashiers">
			<div className="cashiersContainer">
				<div className="top">
					<h2>All Users</h2>
					<Link to="/dashboard/cashiers/create" className="link">
						<button>
							<AiOutlinePlus />
							CREATE
						</button>
					</Link>
				</div>
				{loading ? (
					<Loader />
				) : users?.length > 0 ? (
					<div className="table">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Image</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Address</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id}>
										<td>{user._id.slice(0, 12)}...</td>
										<td>
											<img
												src={"/upload/" + user.img}
												alt=""
												className="image"
												style={{
													width: "32px",
													height: "32px",
													borderRadius: "50%",
													objectFit: "cover",
												}}
											/>
										</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.phone}</td>
										<td>{user.address}</td>

										<td>
											<div className="action">
												<span
													className="view"
													onClick={() => handleNavigate(user)}
												>
													View
												</span>
												<span
													className="trash"
													onClick={() => dispatch(deleteUser(user._id))}
												>
													<BiTrashAlt />
												</span>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<span className="noSales">No cashiers.</span>
				)}
			</div>
		</div>
	);
};

export default Cashiers;
