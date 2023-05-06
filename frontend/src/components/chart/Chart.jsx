import "./chart.scss";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ data }) => {
	return (
		<ResponsiveContainer width="100%" aspect={3 / 0.5}>
			<AreaChart
				width={500}
				height={400}
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}
			>
				{/* <CartesianGrid strokeDasharray="3 3" /> */}
				<XAxis dataKey="name" />
				{/* <YAxis /> */}
				<Tooltip />
				<Area
					type="monotone"
					dataKey="Monthly Income"
					stroke="#8884d8"
					fill="#8884d8"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default Chart;
