import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getTrendsData, 
    addSubredditDropdown, 
    addTrendDropdown 
} from "./TrendsSlice";
import FrequencyOfTrendInAllSubredditsLineGraph from "../../Components/Graphs/TrendsGraph/FrequencyOfTrendInAllSubredditsLineGraph";
import FrequencyOfAllTrendsInSingleSubredditsLineGraph from "../../Components/Graphs/TrendsGraph/FrequencyOfAllTrendsInSingleSubredditsLineGraph";
import DropDownMenu from "../../Components/DropdownMenu/DropdownMenu";

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
  const trendsDropdown = useSelector((state) => state.trends.trendDropdown);
  const selectedTrendKeyword = useSelector((state) => state.trends.selectedTrendDropdown);
  const subredditDropdown = useSelector((state) => state.trends.subredditDropdown);
  const selectedSubredditKeyword = useSelector((state) => state.trends.selectedSubredditDropdown);
  const onUpdateTrendWords = async (event) => {
    event.preventDefault();
    if (!trendsDropdown.includes(trendKeyword)){
        dispatch(addTrendDropdown(trendKeyword))
        const new_set = new Set(trendWords);
        new_set.add(trendKeyword);
        const new_arr = Array.from(new_set);
        
        setTrendWords(new_arr);
        
    }
    setTrendKeyword("");
  };
  const onUpdateSubredditNames = async (event) => {
    event.preventDefault();
    if (!subredditDropdown.includes(subreddit)){
    dispatch(addSubredditDropdown(subreddit))
    const new_set = new Set(subredditNames);
    new_set.add(subreddit);
    const new_arr = Array.from(new_set);
    setSubredditNames(new_arr);
    
    }
    setSubreddit("");
  };

  const handleClickForTrends = async (event) => {
    
    event.preventDefault();
    // Get Trends Data based on all items of subredditDropdown x trendsDropdown but display only selectedTrendsKeyword
    dispatch(getTrendsData());
  };

  const handleClickForSubreddits = async (event) => {
    event.preventDefault();
    dispatch(getTrendsData());
  };
  let OneTrendOverAllSubredditGraphs = [null];
  let AllTrendsOverOneSubredditGraphs = [null];

  if (trends.status === "loading") {
    console.log("This is loading");
    OneTrendOverAllSubredditGraphs[0] = <p>This is loading</p>;
  }
  if (trends.status === "succeeded") {
    console.log("This succeeded");
    const data = trends.data;
    for (var [key, value] of Object.entries(data.data)) {
      dataTrend.push({
        query: value.query,
        date: value.date,
      });
    }
    // Formatting / Feeding of data to OneTrendOverAllSubredditGraphs
    for (let i = 0; i < trendsDropdown.length; i++) {

      // Separating data by trend word
      let graphData = [];
      for (var [key, value] of Object.entries(data.data)) {
        if (value.query === trendsDropdown[i]) {
          graphData.push(value.date);
        }
      }
      if (graphData.length === 0){
        OneTrendOverAllSubredditGraphs[i] = <p>No data found</p>
        continue;
      }
      // sort data by date
      graphData.sort(function (a, b) {
        a = a.split("/");
        b = b.split("/");
        return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
      });
      // count frequency at each date
      let freqData = [];
      for (const num of graphData) {
        freqData[num] = freqData[num] ? freqData[num] + 1 : 1;
      }
      //compile frequency and date together to give to graph
      let finalData = [];
      for (var [key, value] of Object.entries(freqData)) {
        finalData.push({
          date: key,
          freq: value,
        });
      }
      console.log(finalData)
      // Create a graph for each trend word
      OneTrendOverAllSubredditGraphs[i] = <FrequencyOfTrendInAllSubredditsLineGraph data={finalData} word={trendsDropdown[i]} />;
    }

    for (let i = 0; i < subredditDropdown.length; i++){

        // Separating data by subreddit word
      let graphData = [];
      console.log(data.data)
      for (var [key, value] of Object.entries(data.data)) {
        if (value.subreddit === subredditDropdown[i]) {
          graphData.push({date:value.date, trend: value.query});
        }
      }
      if (graphData.length === 0){
        AllTrendsOverOneSubredditGraphs[i] = <p>No data found</p>
        continue;
      }

      // sort data by date
      graphData.sort(function (a, b) {
        a = a.date.split("/");
        b = b.date.split("/");
        return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
      });


      // count frequency at each date for each trend
      let freqData = [];
      for (let i = 0; i < trendsDropdown.length; i++){
        for (const data of graphData) {
            if (data.trend === trendsDropdown[i]){
                freqData[data.trend] = []
            }
        }
    }
    

      for (let i = 0; i < trendsDropdown.length; i++){
        for (const data of graphData) {
            if (data.trend === trendsDropdown[i]){
                freqData[data.trend].push({freq: null, date: data.date})
            }
        }
    }
    
      for (let i = 0; i < trendsDropdown.length; i++){
        for (const data of graphData) {
            if (data.trend === trendsDropdown[i]){
                for (const i of freqData[data.trend]){
                    if (i.date === data.date){
                        i.freq = i.freq ? i.freq + 1 : 1

                    }
                }
                
            }
        }
      }

      if (freqData.size === 0 || !freqData.size){
        console.log(freqData)
        console.log(freqData.size)
        AllTrendsOverOneSubredditGraphs[i] = <p>Invalid trend entered</p>
        continue;
      }
      for (var trend of trendsDropdown){
        freqData[trend] = freqData[trend].filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.freq === value.freq && t.date === value.date
        ))
      )
      }
      //compile frequency, date, and trend together to give to graph
      let finalData = [];
      for (const [key, value] of Object.entries(freqData)) {
        let freqValue = value
        let freqKey = key
        for (const [key, value] of Object.entries(freqValue)){
            var datum = {[freqKey]: value.freq,
            date: value.date}
            finalData.push(datum);
        }
      }
      finalData.sort(function (a, b) {
        a = a.date.split("/");
        b = b.date.split("/");
        return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
      });
      
      console.log(finalData)
      AllTrendsOverOneSubredditGraphs[i] = <FrequencyOfAllTrendsInSingleSubredditsLineGraph data={finalData} subreddit={subredditDropdown[i]}/>

    }

  }

  if (trends.status === "failed") {
    OneTrendOverAllSubredditGraphs[0] = <p>This Failed</p>;
    AllTrendsOverOneSubredditGraphs[0] = <p>This Failed</p>;
  }

  const trendsMenu = DropDownMenu(trendsDropdown, "Trends");
  const subredditMenu = DropDownMenu(subredditDropdown, "Subreddits");

  return (
    <>
      <div>
        

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

          <form onSubmit={handleClickForTrends}>
            {trendsMenu}
            <input type="submit" value="Generate" />
          </form>
          
        <div>{OneTrendOverAllSubredditGraphs[trendsDropdown.indexOf(selectedTrendKeyword)]}</div>


      <form onSubmit={handleClickForSubreddits}>
            {subredditMenu}
            <input type="submit" value="Generate" />
          </form>
    <div>{AllTrendsOverOneSubredditGraphs[subredditDropdown.indexOf(selectedSubredditKeyword)]}</div>
    </div>
    </>
  );
}

export default Trends;
