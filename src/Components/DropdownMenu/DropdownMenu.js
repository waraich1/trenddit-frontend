import { Dropdown } from "semantic-ui-react";
import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";

function DropDownMenu(input, title) {
  var [currentValue, setCurrentValue] = useState("");
  var options = [];
  const handleChange = (e, { value }) => {
    setCurrentValue(value);
    console.log(value);
  };

  input.map((item) => options.push({ key: item, value: item, text: item }));
  // console.log("This" + JSON.stringify(currentValue));
  console.log("This is " + currentValue);
  return (
    <Dropdown
      placeholder={title}
      selection
      options={options}
      value={currentValue}
      onChange={handleChange}
    />
  );
}

export default DropDownMenu;
