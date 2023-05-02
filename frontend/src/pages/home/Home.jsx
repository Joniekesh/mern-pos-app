import "./home.scss";
import ProductItem from "../../components/productItem/ProductItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/apiCalls/ProductApi";
import Loader from "../../components/loader/Loader";

const Home = () => {
	const dispatch = useDispatch();

	const { products, loading } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<div className="home">
			<div className="products">
				{loading ? (
					<Loader />
				) : products.length > 0 ? (
					products.map((product) => (
						<ProductItem key={product._id} product={product} />
					))
				) : (
					<span>No product yet!</span>
				)}
			</div>
		</div>
	);
};

export default Home;
