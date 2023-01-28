import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LabelList,
  Label
} from "recharts";

// const tooltipPayload = (data) => {
//   const tooltipArray = []
//   data.forEach(element => {
//     tooltipArray.push(
//     {hour: "Hour : " + element['hour'],
//     frequency: element['frequency']}
//     )
//   });
//   console.log(tooltipArray)
//   return tooltipArray
// }


const SubredditLineGraph = (props) => (
  <ResponsiveContainer width="100%" height={500}>
    <LineChart data={props.data}>
      <XAxis
      height={50}
      dataKey="hour"
        tick={true}
        label={{ value: "UTC Time (Hours)", position: "insideBottom", offset: "0" }}
      />
      <YAxis width={100}>
        <Label angle={270} value={props.yLabel} />
      </YAxis>

      <Line dataKey={props.dataKey} fill="#8884d8" type={'natural'}>
        <LabelList dataKey="label" position="bottom" angle="0" offset={10} fill="black" />
      </Line>
    </LineChart>
  </ResponsiveContainer>
);


export {SubredditLineGraph};
