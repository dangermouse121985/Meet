import { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const EventGenresChart = ({ events }) => {
    const [data, setdata] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'JQuery', 'Angular'];

    useEffect(() => {
        setdata(getData());
    }, [`${events}`]);


    const getData = () => {
        const data = genres.map(genre => {
            const filteredEvents = events.filter(event => event.summary.includes(genre));
            return {
                name: genre,
                value: filteredEvents.length
            }
        });
        return data;
    }

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <ResponsiveContainer width="80%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fil="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenresChart;