import { useState, useEffect } from "react";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const getData = () => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split((/, | - /))[0];
            return { city, count };
        })
        return data;
    };

    return (
        <ResponsiveContainer width="99%" height={450} >
            <h2 className="chart-title">Number of Events by City</h2>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 100,
                    left: -30,
                }}
            >
                <CartesianGrid />
                <XAxis
                    type="category" dataKey="city" name="City"
                    angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
                <YAxis type="number" dataKey="count" name="Number of Events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A school" data={data} fill="#2b3990" />
            </ScatterChart>
        </ResponsiveContainer >
    );
}

export default CityEventsChart;