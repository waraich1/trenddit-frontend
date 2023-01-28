import { Select } from "semantic-ui-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTrendDropdown, setSelectedSubredditDropdown } from "../../Pages/Trends/TrendsSlice.js";
import "semantic-ui-css/semantic.min.css";

function DropDownMenu(input, title) {
  var [currentValue, setCurrentValue] = useState("");
  var options = [];
  var placeholderValue = title;
  const selectedTrendKeyword =  useSelector((state) => state.trends.selectedTrendDropdown);
  const selectedSubredditKeyWord = useSelector((state) => state.trends.selectedSubredditDropdown);

  const dispatch = useDispatch();
  const handleChange = (e, { value }) => {
    if (title === "Trends"){
        dispatch(setSelectedTrendDropdown(value))
        
    }
    else if (title === "Subreddits"){
        dispatch(setSelectedSubredditDropdown(value))
        
    }
    setCurrentValue(value)
  };
  input.map((item) => options.push({ key: item, value: item, text: item }));
  return (
    <Select
      placeholder={title}
      options={options}
      value={currentValue}
      onChange={handleChange}
    />
  );
}

export default DropDownMenu;
