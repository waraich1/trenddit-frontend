import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubredditData } from "./subredditSlice";
import SubredditBarGraph from "../../Components/Graphs/Subreddit_Graph/subredditBarGraph";
function Subreddit() {
  const dataR = [];
  const dispatch = useDispatch();
  const [subreddit, setSubreddit] = useState("");
  const [error, setError] = useState(null);

  const subredditD = useSelector((state) => state.subreddit);

  const handleClick = async (event) => {
    event.preventDefault();
    dispatch(getSubredditData());
  };

  let Graph = null;
  if (subredditD.status === "loading") {
    console.log("This is loading");
    Graph = <p>This is loading</p>;
  }
  if (subredditD.status === "succeeded") {
    console.log("This succeeded");
    const data = subredditD.data;

    for (const [key, value] of Object.entries(data.author)) {
      dataR.push({
        author: key,
        comments: value,
      });
    }
    console.log(dataR);
    Graph = <SubredditBarGraph data={dataR} />;
  }
  if (subredditD.status === "failed") {
    Graph = <p>This Failed</p>;
  }

  return (
    <>
      <form onSubmit={handleClick}>
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
      {Graph}
    </>
  );
}

export default Subreddit;
