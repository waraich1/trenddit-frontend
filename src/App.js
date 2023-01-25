import React from 'react'
import "./Components/Sidebar/Sidebar.css";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Subreddit from "./Pages/Subreddit/Subreddit";
import Trends from "./Pages/Trends/Trends";
import User from "./Pages/User/User";
import Home from "./Pages/Home/Home";

const App = () => {
  const mainAppWrapper = (Component) => (
    <>
      <Sidebar />
      <Component />
    </>
  );

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route exact path="/" element={mainAppWrapper(Home)} />
            <Route
              exact
              path="/subreddit"
              element={mainAppWrapper(Subreddit)}
            />
            
            <Route exact path="/user" element={mainAppWrapper(User)} />
            <Route exact path="/trends" element={mainAppWrapper(Trends)} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
