import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubredditCommentData, getSubredditPostData } from "./subredditSlice";
import {SubredditBarGraph} from "../../Components/Graphs/Subreddit_Graph/subredditBarGraph";
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
  const dispatch = useDispatch();
  const [subreddit, setSubreddit] = useState("");
  const [isTop, setIsTop] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [loaderActive, setLoader] = useState(false);

  const subredditD = useSelector((state) => state.subreddit);

  const handleDropdown = (e, result) => {
    if (result.value === "Top" ) {
      setIsTop(true);
    }
    else {setIsTop(false)}
  }

  const handleClick = async (event) => {
    event.preventDefault();
    setButtonIsDisabled(true) 
    setLoader(true)
    dispatch(getSubredditCommentData());
    dispatch(getSubredditPostData());
  };

  let loader = <Loader active={loaderActive} size="big"/>

  // Initialize graphs
  let Graph = <Loader active={loaderActive}/>
  let Graph1 = <Loader active={loaderActive}/>;
  let Graph2 = <Loader active={loaderActive}/>;
  let Graph3 = <Loader active={loaderActive}/>;
  let Graph4 = <Loader active={loaderActive}/>;

  // Check subreddit data status 
  if (subredditD.data.CommentData.status === "loading" ||
    subredditD.data.PostData.status === "loading") {
      
  }
  if (subredditD.data.CommentData.status === "succeeded" && 
    subredditD.data.PostData.status === "succeeded") {
    const commentData = subredditD.data.CommentData.data;
    const PostData = subredditD.data.PostData.data;
      
    commFreqData = formatData(commentData.author_by_comments, "author", "comments")
    commScoreData = formatData(commentData.author_by_score, "author", "score")
    postFreqData = formatData(PostData.auth_freq, "author", "posts")
    postScoreData = formatData(PostData.author_score, "author", "score")
    commWordTrendData = formatData(commentData.text, "text", "value")

    Graph = <SubredditBarGraph data={commFreqData} yLabel={"Number of Comments"} dataKey="comments"/>;
    Graph1 = <SubredditBarGraph data={commScoreData} yLabel={"Total comment score"} dataKey="score"/>;
    Graph2 = <SimpleWordcloud words={commWordTrendData}/>;
    Graph3 = <SubredditBarGraph data={postFreqData} yLabel={"Number of Posts"} dataKey="posts"/>;
    Graph4 = <SubredditBarGraph data={postScoreData} yLabel={"Total post score"} dataKey="score"/>;
    loader = null;
  }
  if (subredditD.data.CommentData.status === "failed" ||
    subredditD.data.PostData.status === "failed") {
    Graph = <p>This Failed</p>;
    Graph1 = <p>This Failed</p>;
    Graph2 = <p>This Failed</p>;
    Graph3 = <p>This Failed</p>;
    Graph4 = <p>This Failed</p>;
    loader = null;
  }

  return (
    <>
    <Container>
      <Grid textAlign="center" columns={3} divided padded='vertically'>
        <Grid.Row>
          <Grid.Column stretched>
            <Input type='text' placeholder='Subreddit Name' action>
            </Input>
          </Grid.Column>
          <Grid.Column stretched>
            <Select options={sortOptions} defaultValue='Hot' onChange={handleDropdown}/>
          </Grid.Column>
          <Grid.Column stretched>
            <Select options={topOptions} disabled={!isTop} defaultValue='Month'/>
          </Grid.Column>
        </Grid.Row>
        {loader != null &&
        <>
        <Grid.Row>
          <Button type='submit' disabled={buttonIsDisabled} onClick={handleClick} >Generate Analyses</Button>
        </Grid.Row>
        <Grid.Row>
          {loader}
        </Grid.Row>
        </>
        }
        {loader === null &&
        <>
        <Grid.Row>
          <Button type='submit' onClick={handleClick} >Generate Analyses</Button>
        </Grid.Row>
        <Grid.Row>
            <Card fluid>
              <Card.Content>
                <Card.Header content="Comment Frequency By Author" textAlign="center"></Card.Header>
                {Graph}
              </Card.Content>
            </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Comment Score By Author" textAlign="center"></Card.Header>
              {Graph1}
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Subreddit Word Frequency" textAlign="center"></Card.Header>
              <div style={{"padding-top":"1em"}}>{Graph2}</div>
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Post Frequency By Author" textAlign="center"></Card.Header>
              {Graph3}
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="Post Score By Author" textAlign="center"></Card.Header>
              {Graph4}
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
