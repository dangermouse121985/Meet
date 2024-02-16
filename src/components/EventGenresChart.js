import { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from "recharts";

const EventGenresChart = ({ events }) => {
    const [data, setdata] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'JQuery', 'Angular'];
    const colors = ['#2B3990', '#4960A3', '#6686B6', '#A0D2DB', '#397367',];

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
                fill="#000"
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
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                >
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenresChart;