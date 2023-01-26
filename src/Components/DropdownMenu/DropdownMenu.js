import { Dropdown } from 'semantic-ui-react'
import React from 'react';
import 'semantic-ui-css/semantic.min.css';



function dropDownMenu(input, title) {
    return (
      <>
      <Dropdown text={title}>
    <Dropdown.Menu>
    {input.map( (word, index) => ( <Dropdown.Item key= {index}text={`${word}`}/>))}
    </Dropdown.Menu>
  </Dropdown>
    
      </>
    );
  }

export default dropDownMenu;


