import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Label
} from "recharts";


const UserBarGraph = (props) => (
  <ResponsiveContainer width="100%" height={500}>
    <BarChart data={props.data}>
      <XAxis
      height={50}
      dataKey="subreddit"
        tick={false}
        label={{ value: "Subreddit", position: "insideBottom", offset: "0" }}
      />
      <YAxis width={100}>
        <Label angle={270} value={props.yLabel} />
      </YAxis>

      <Tooltip />
      <Bar dataKey={props.dataKey} fill="#8884d8">
        <LabelList dataKey="label" position="bottom" angle="0" offset={10} fill="black" />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);


export {UserBarGraph};
