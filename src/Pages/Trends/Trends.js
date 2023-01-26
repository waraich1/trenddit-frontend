import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendsData } from "./TrendsSlice";
import TrendsLineGraph from "../../Components/Graphs/TrendsGraph/TrendsLineGraph";
import dropDownMenu from "../../Components/DropdownMenu/DropdownMenu";

function Trends() {
  const dataSubreddit = [];
  const currentlySelectedTrend = "";
  const dataTrend = [];
  const [trendWords, setTrendWords] = useState([]);
  const [subredditNames, setSubredditNames] = useState([]);
  const dispatch = useDispatch();
  const [subreddit, setSubreddit] = useState("");
  const [trendKeyword, setTrendKeyword] = useState("");
  const [error, setError] = useState(null);

  const trends = useSelector((state) => state.trends);

  const onUpdateTrendWords = async (event) => {
    event.preventDefault();
    const new_set = new Set(trendWords);
    new_set.add(trendKeyword);
    const new_arr = Array.from(new_set);

    setTrendWords(new_arr);
    setTrendKeyword("");
  };
  const onUpdateSubredditNames = async (event) => {
    event.preventDefault();
    const new_set = new Set(subredditNames);
    new_set.add(subreddit);
    const new_arr = Array.from(new_set);
    setSubredditNames(new_arr);
    setSubreddit("");
  };

  const handleClickForTrends = async (event) => {
    console.log("HERE IS THE TRENDS MENU SELECTION");
    console.log(trendsMenu);
    event.preventDefault();
    dispatch(getTrendsData());
  };

  const handleClickForSubreddits = async (event) => {
    event.preventDefault();
    dispatch(getTrendsData());
  };
  let Graphs = [null];

  if (trends.status === "loading") {
    console.log("This is loading");
    Graphs[0] = <p>This is loading</p>;
  }
  if (trends.status === "succeeded") {
    console.log("This succeeded");
    const data = trends.data;
    console.log(data);
    for (var [key, value] of Object.entries(data.data)) {
      dataTrend.push({
        query: value.query,
        date: value.date,
      });
    }
    for (let i = 0; i < trendWords.length; i++) {
      let graphData = [];
      for (var [key, value] of Object.entries(data.data)) {
        if (value.query == trendWords[i]) {
          graphData.push(value.date);
        }
      }
      graphData.sort(function (a, b) {
        a = a.split("/");
        b = b.split("/");
        return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
      });
      let freqData = [];
      console.log(graphData);
      for (const num of graphData) {
        freqData[num] = freqData[num] ? freqData[num] + 1 : 1;
      }
      let finalData = [];

      for (var [key, value] of Object.entries(freqData)) {
        finalData.push({
          date: key,
          freq: value,
        });
      }
      // console.log(finalData)

      Graphs[i] = <TrendsLineGraph data={finalData} word={trendWords[i]} />;
    }
    console.log(dataTrend);
  }

  if (trends.status === "failed") {
    Graphs[0] = <p>This Failed</p>;
  }

  const trendsMenu = dropDownMenu(trendWords, "Trends");

  return (
    <>
      <div>
        <form onSubmit={onUpdateSubredditNames}>
          <label>
            Enter subreddit name:
            <input
              type="text"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>

        <form onSubmit={onUpdateTrendWords}>
          <label>
            Enter trend name:
            <input
              type="text"
              value={trendKeyword}
              onChange={(e) => {
                setTrendKeyword(e.target.value);
              }}
            />
          </label>
          <input type="submit" />
        </form>

        <div>
          <form onSubmit={handleClickForTrends}>
            {trendsMenu}
            <input type="submit" />
          </form>
          <form onSubmit={handleClickForSubreddits}>
            {dropDownMenu(subredditNames, "Subreddits")}
            <input type="submit" />
          </form>
        </div>
        <div>{Graphs[0]}</div>
      </div>
    </>
  );
}

export default Trends;
