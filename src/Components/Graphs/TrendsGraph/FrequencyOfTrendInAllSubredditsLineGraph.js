import React, { PureComponent } from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';



const FrequencyOfTrendInAllSubredditsLineGraph = (props) => (
    <ResponsiveContainer width="80%" height={600}>
    <LineChart data={props.data}>
    <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date"
      />
      <YAxis
        label={{
          value: 'Frequency of ' + props.word + ' mentions',
          angle: -90,
          position: "Left",
        }}
      />
      <Tooltip />
      <Line dataKey="freq" stroke="#8884d8">
      </Line>
    </LineChart>
  </ResponsiveContainer>
);

export default FrequencyOfTrendInAllSubredditsLineGraph;