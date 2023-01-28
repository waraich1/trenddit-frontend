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

const FrequencyOfSingleTrendInSingleSubredditsLineGraph = (props) => (
  <ResponsiveContainer width="80%" height={600}>
    <LineChart data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis
        label={{
          value:
            "Frequency of " + props.word + " mentions in " + props.subreddit,
          angle: -90,
          position: "Left",
        }}
      />
      <Tooltip />
      <Line type="natural" connectNulls dataKey="freq" stroke="#00FF00"></Line>
    </LineChart>
  </ResponsiveContainer>
);

export default FrequencyOfSingleTrendInSingleSubredditsLineGraph;
