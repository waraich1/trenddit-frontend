import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  LabelList,
} from "recharts";

const SubredditBarGraph = (props) => (
  <ResponsiveContainer width="80%" height={600}>
    <BarChart data={props.data}>
      <XAxis
        tick={false}
        label={{ value: "Author", position: "insideBottom", offset: "-5" }}
      />
      <YAxis
        label={{
          value: "Number of comments",
          angle: -90,
          position: "Left",
        }}
      />
      <Tooltip />
      <Bar dataKey="comments" fill="#8884d8">
        <LabelList dataKey="author" position="center" angle="90" fill="black" />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default SubredditBarGraph;
