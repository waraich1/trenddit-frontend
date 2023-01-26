import { Dropdown } from 'semantic-ui-react'
import React, { useState } from "react";
import 'semantic-ui-css/semantic.min.css';



function DropDownMenu(input, title) {

    
    var [currentValue, setCurrentValue] = useState("");
    var options = [];

    input.map((item) => options.push({key: item, value: item, text: item}))


    return ( <Dropdown placeholder={title} selection options={options} value = {currentValue} onChange={setCurrentValue}/>
    );
  }



export default DropDownMenu;



