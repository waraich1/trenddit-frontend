import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./userSlice";
import { UserBarGraph } from "../../Components/Graphs/UserGraph/userBarGraph";
import { Container, Button, Select, Input, Grid, Card, Dimmer, Loader } from 'semantic-ui-react'
import { formatUserData } from "../../Components/userComponents/formatUserObjects";

function User() {
  let topCommentSubreddits = [];
  let topCommScoreSubreddits = [];
  let topPostSubreddits = [];
  let topPostScoreSubreddits = [];
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [loaderActive, setLoader] = useState(false);
  const userParams = {user: user}

  const userD = useSelector((state) => state.user);

  const handleInput = (e, result) => {
    setUser(result.value)
  }

  const handleClick = async (event) => {
    event.preventDefault();
    setButtonIsDisabled(true) 
    setLoader(true)
    dispatch(getUserData(userParams));
  };

  let loader = <Loader active={loaderActive} size="big"/>

  // Initialize graphs
  let topCommGraph = <Loader active={loaderActive}/>
  let topCommScoreGraph = <Loader active={loaderActive}/>;
  let topPostGraph = <Loader active={loaderActive}/>;
  let topPostScoreGraph = <Loader active={loaderActive}/>;

  // Check subreddit data status 
  if (userD.status === "loading") {
      
  }
  if (userD.status === "succeeded") {
    const userData = userD.data.data
    // console.log(userData)

    topCommentSubreddits = formatUserData(userData.comments, "subreddit", "comments", "num_of_comments")
    topCommScoreSubreddits = formatUserData(userData.comments, "subreddit", "score", "score")
    topPostSubreddits = formatUserData(userData.posts, "subreddit", "posts", "num_of_posts")
    topPostScoreSubreddits = formatUserData(userData.posts, "subreddit", "score", "score")

    topCommGraph = <UserBarGraph data={topCommentSubreddits} yLabel={"Number of Comments"} dataKey="comments"/>;
    topCommScoreGraph = <UserBarGraph data={topCommScoreSubreddits} yLabel={"Total comment score"} dataKey="score"/>;
    topPostGraph = <UserBarGraph data={topPostSubreddits} yLabel={"Number of Posts"} dataKey="posts"/>;
    topPostScoreGraph = <UserBarGraph data={topPostScoreSubreddits} yLabel={"Total post score"} dataKey="score"/>;
    loader = null;
  }
  if (userD.status === "failed") {
    topCommGraph = <p>This Failed</p>;
    topCommScoreGraph = <p>This Failed</p>;
    topPostGraph = <p>This Failed</p>;
    topPostScoreGraph = <p>This Failed</p>;
    loader = null;
  }

  return (
    <>
    <Container>
      <Grid textAlign="center" columns={3} divided padded='vertically'>
        <Grid.Row>
          <Grid.Column stretched>
            <Input type='text' placeholder='User Name' disabled={buttonIsDisabled && (loader != null)} onChange={handleInput} action>
            </Input>
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
                <Card.Header content="User Comment Frequency by Subreddit" textAlign="center"></Card.Header>
                {topCommGraph}
              </Card.Content>
            </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="User Comment Score by Subreddit" textAlign="center"></Card.Header>
              {topCommScoreGraph}
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="User Post Frequency by Subreddit" textAlign="center"></Card.Header>
              {topPostGraph}
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header content="User Post Score by Subreddit" textAlign="center"></Card.Header>
              {topPostScoreGraph}
            </Card.Content>
          </Card>
        </Grid.Row>
        </>}
      </Grid>
    </Container>
    </>
  );
}


export default User;