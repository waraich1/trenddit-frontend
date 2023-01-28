import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubredditCommentData, getSubredditPostData } from "./subredditSlice";
import {SubredditBarGraph} from "../../Components/Graphs/Subreddit_Graph/subredditBarGraph";
import { SubredditLineGraph } from "../../Components/Graphs/Subreddit_Graph/subredditLineGraph";
import {SimpleWordcloud} from "../../Components/Graphs/Subreddit_Graph/subredditWordCloud";
import { Container, Button, Select, Input, Grid, Card, Dimmer, Loader } from 'semantic-ui-react'
import { formatData } from "../../Components/subredditComponents/formatObjects";
import { sortOptions, topOptions } from "../../Components/subredditComponents/subredditDropdown";

function Subreddit() {
  let commFreqData = [];
  let commScoreData = [];
  let commWordTrendData = [];
  let postFreqData = [];
  let postScoreData = [];
  let postTimeData = [];
  const dispatch = useDispatch();
  const [subreddit, setSubreddit] = useState("");
  const [sortValue, setSortValue] = useState("Hot");
  const [topValue, setTopValue] = useState("");
  const [isTop, setIsTop] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [loaderActive, setLoader] = useState(false);
  const subredditParams = {subreddit: subreddit, sort: sortValue, top: topValue}

  const subredditD = useSelector((state) => state.subreddit);

  const handleSortDropdown = (e, result) => {
    if (result.value === "Top" ) {
      setIsTop(true);
      setTopValue("Month")
    }
    else {
      setIsTop(false)
      setTopValue("")
    }
    setSortValue(result.value)
  }

  const handleTopDropdown = (e, result) => {
    setTopValue(result.value)
  }

  const handleInput = (e, result) => {
    setSubreddit(result.value)
  }

  const handleClick = async (event) => {
    event.preventDefault();
    setButtonIsDisabled(true) 
    setLoader(true)
    dispatch(getSubredditCommentData(subredditParams));
    dispatch(getSubredditPostData(subredditParams));
  };

  let loader = <Loader active={loaderActive} size="big"/>

  // Initialize graphs
  let commFreqGraph = <Loader active={loaderActive}/>
  let commScoreGraph = <Loader active={loaderActive}/>;
  let commWordCloud = <Loader active={loaderActive}/>;
  let postFreqGraph = <Loader active={loaderActive}/>;
  let postScoreGraph = <Loader active={loaderActive}/>;
  let postTimeGraph = <Loader active={loaderActive}/>;

  // Check subreddit data status 
  if (subredditD.data.CommentData.status === "loading" ||
    subredditD.data.PostData.status === "loading") {
      
  }
  if (subredditD.data.CommentData.status === "succeeded" && 
    subredditD.data.PostData.status === "succeeded") {
    const commentData = subredditD.data.CommentData.data;
    const PostData = subredditD.data.PostData.data;
      
    commFreqData = formatData(commentData.author, "author", "comments")
    commScoreData = formatData(commentData.author_by_score, "author", "score")
    postFreqData = formatData(PostData.auth_freq, "author", "posts")
    postScoreData = formatData(PostData.author_score, "author", "score")
    commWordTrendData = formatData(commentData.text, "text", "value")
    postTimeData = formatData(PostData.hour_counter, "hour", "frequency")

    commFreqGraph = <SubredditBarGraph data={commFreqData} yLabel={"Number of Comments"} dataKey="comments"/>;
    commScoreGraph = <SubredditBarGraph data={commScoreData} yLabel={"Total comment score"} dataKey="score"/>;
    commWordCloud = <SimpleWordcloud words={commWordTrendData}/>;
    postFreqGraph = <SubredditBarGraph data={postFreqData} yLabel={"Number of Posts"} dataKey="posts"/>;
    postScoreGraph = <SubredditBarGraph data={postScoreData} yLabel={"Total post score"} dataKey="score"/>;
    postTimeGraph = <SubredditLineGraph data={postTimeData} yLabel={"Number of posts"} dataKey="frequency"/>;
    loader = null;
  }
  if (subredditD.data.CommentData.status === "failed" ||
    subredditD.data.PostData.status === "failed") {
    commFreqGraph = <p>This Failed</p>;
    commScoreGraph = <p>This Failed</p>;
    commWordCloud = <p>This Failed</p>;
    postFreqGraph = <p>This Failed</p>;
    postScoreGraph = <p>This Failed</p>;
    postTimeGraph = <p>This Failed</p>
    loader = null;
  }

  return (
    <>
    <Container>
      <Grid textAlign="center" columns={3} divided padded='vertically'>
        <Grid.Row>
          <Grid.Column stretched>
            <Input type='text' placeholder='Subreddit Name' disabled={buttonIsDisabled && (loader != null)} onChange={handleInput} action>
            </Input>
          </Grid.Column>
          <Grid.Column stretched>
            <Select options={sortOptions} defaultValue='Hot' disabled={buttonIsDisabled && (loader != null)} onChange={handleSortDropdown}/>
          </Grid.Column>
          <Grid.Column stretched>
            <Select options={topOptions} disabled={(buttonIsDisabled && (loader != null)) || !isTop} defaultValue='Month' onChange={handleTopDropdown}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button type='submit' disabled={buttonIsDisabled && (loader != null)} onClick={handleClick} >Generate Analyses</Button>
        </Grid.Row>
        <Grid.Row>
          {loader}
        </Grid.Row>
        {loader === null &&
        <>
        <Grid.Row>
            <Card fluid>
              <Card.Content>
                <Card.Header content="Comment Frequency By Author" textAlign="center"></Card.Header>
                {commFreqGraph}
              </Card.Content>
            </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Comment Score By Author" textAlign="center"></Card.Header>
              {commScoreGraph}
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Subreddit Word Frequency" textAlign="center"></Card.Header>
              <div style={{"padding-top":"1em"}}>{commWordCloud}</div>
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Post Frequency By Author" textAlign="center"></Card.Header>
              {postFreqGraph}
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Post Score By Author" textAlign="center"></Card.Header>
              {postScoreGraph}
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Post Frequency by Hour" textAlign="center"></Card.Header>
              {postTimeGraph}
            </Card.Content>
          </Card>
        </Grid.Row>
        </>}
      </Grid>
    </Container>
    </>
  );
}

export default Subreddit;
