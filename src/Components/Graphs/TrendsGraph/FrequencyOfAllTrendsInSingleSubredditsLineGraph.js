import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";

function FrequencyOfAllTrendsInSingleSubredditsLineGraph(props) {
  const trendsDropdown = useSelector((state) => state.trends.trendDropdown);
  const colors = [
    "#FF0000",
    "#800080",
    "#FF00FF",
    "#008000",
    "#000080",
    "#008080",
  ];
  return (
    <ResponsiveContainer width="80%" height={600}>
      <LineChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          label={{
            value: "Frequency of Trends in" + props.subreddit,
            angle: -90,
            position: "Left",
          }}
        />
        <Tooltip />
        <Legend />

        {trendsDropdown.map((value, index) => {
          console.log(`${value} has been created`);

          return (
            <Line
              connectNulls
              type="natural"
              key={value}
              dataKey={value}
              stroke={colors[index]}
              fill={
                colors[index]
                  ? colors[index]
                  : "#000000".replace(/0/g, function () {
                      return (~~(Math.random() * 16)).toString(16);
                    })
              }
              activeDot={{ r: 5 }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default FrequencyOfAllTrendsInSingleSubredditsLineGraph;
