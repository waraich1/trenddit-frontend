import React from 'react';
import ReactWordcloud   from 'react-wordcloud';

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: true,
  fontFamily: "impact",
  fontSizes: [20, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

const SimpleWordcloud = (props) => {
  return <ReactWordcloud words={props.words} options={options} />
}
 
export {SimpleWordcloud};