import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./userSlice";
import { UserBarGraph } from "../../Components/Graphs/UserGraph/userBarGraph";
import { Container, Button, Input, Grid, Card, Dimmer, Loader, Statistic, CardContent } from 'semantic-ui-react'
import { formatUserData } from "../../Components/userComponents/formatUserObjects";
import '../../index.css'

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
  let failed = false
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
  let topCommGraph = null
  let topCommScoreGraph = null
  let topPostGraph = null
  let topPostScoreGraph = null
  let userInfo = null;
  let commStat = null;
  let postStat = null;
  let lowestCommInfo = null;
  let highestCommInfo = null;
  let lowestPostInfo = null;
  let highestPostInfo = null;

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
    const userName = userData.name
    const totalKarma = userData.total_karma
    const totalComments = userData.total_comments
    const totalPosts = userData.total_posts
    const cakeDay = (new Date(userData.cake_day * 1000)).toLocaleDateString()
    const commKarma = userData.comment_karma 
    const avrgCommKarma = userData.average_karma_comment.toFixed(2)
    const postKarma = userData.post_karma
    const avrgPostKarma = userData.average_karma_post.toFixed(2)
    const lowestComment = userData.least_popular_comment
    const highestComment = userData.most_popular_comment
    const lowestPost = userData.least_popular_post
    const highestPost = userData.most_popular_post

    const userInfoitems = [
        {key: "cakeDay", label: "Cake Day", value: cakeDay},
        {key: "userName", label: "UserName", value: userName},
        {key: "totalKarma", label: "Total Karma", value: totalKarma},
    ]

    const commStatItems = [
        {key: "totalComments", label: "Total Comments", value: totalComments},
        {key: "commKarma", label: "Total Comment Karma", value: commKarma},
        {key: "avrgCommKarma", label: "Average Comment Karma", value: avrgCommKarma},
    ]

    const postStatItems = [
        {key: "totalPosts", label: "Total Posts", value: totalPosts},
        {key: "postKarma", label: "Total Post Karma", value: postKarma},
        {key: "avrgPostKarma", label: "Average Post Karma", value: avrgPostKarma}
    ]

    const lowestCommInfoItems = [
        {key: "commSubreddit", label: "Subreddit", value: "r/" + lowestComment.subreddit},
        {key: "commScore", label: "Comment Score", value: lowestComment.score},
        {key: "commBody", label: "Lowest Comment", value: lowestComment.body},
    ]

    const highestCommInfoItems = [
        {key: "commSubreddit", label: "Subreddit", value: "r/" + highestComment.subreddit},
        {key: "commScore", label: "Comment Score", value: highestComment.score},
        {key: "commBody", label: "Highest Comment", value: highestComment.body},
    ]

    const lowestPostInfoItems = [
        {key: "postSubreddit", label: "Subreddit", value: "r/" + lowestPost.subreddit},
        {key: "postScore", label: "Comment Score", value: lowestPost.score},
        {key: "postComments", label: "Number of Comments", value: lowestPost.num_comments},
        {key: "psotTitle", label: "Lowest Post", value: lowestPost.title.replace(/^(\[image\])/, "")},
    ]

    const highestPostInfoItems = [
        {key: "postSubreddit", label: "Subreddit", value: "r/" + highestPost.subreddit},
        {key: "postScore", label: "Comment Score", value: highestPost.score},
        {key: "postComments", label: "Number of Comments", value: highestPost.num_comments},
        {key: "postTitle", label: "Highest Post", value: highestPost.title.replace(/^(\[image\])/, "")},
    ]

    userInfo = <Statistic.Group widths={3} size="small" items={userInfoitems}></Statistic.Group>
    commStat = <Statistic.Group widths={3} size="tiny" items={commStatItems}></Statistic.Group>
    postStat = <Statistic.Group widths={3} size="tiny" items={postStatItems}></Statistic.Group>
    lowestCommInfo =  (
    <>
        <Statistic.Group widths={2} size="tiny" items={lowestCommInfoItems.slice(0,2)}/>
        <Card fluid><Statistic.Group widths={1} size="mini" items={lowestCommInfoItems.slice(2,3)}/></Card>
    </>)
    highestCommInfo =  (
    <>
        <Statistic.Group widths={2} size="tiny" items={highestCommInfoItems.slice(0,2)}/>
        <Card fluid><Statistic.Group widths={1} size="mini" items={highestCommInfoItems.slice(2,3)}/></Card>
    </>)
    lowestPostInfo =  (
    <>
        <Statistic.Group widths={3} size="tiny" items={lowestPostInfoItems.slice(0,3)}/>
        <Card fluid><Statistic.Group widths={1} size="mini" items={lowestPostInfoItems.slice(3,4)}/></Card>
    </>)
    highestPostInfo =  (
    <>
        <Statistic.Group widths={3} size="tiny" items={highestPostInfoItems.slice(0,3)}/>
        <Card fluid><Statistic.Group widths={1} size="mini" items={highestPostInfoItems.slice(3,4)}/></Card>
    </>)

    loader = null;
  }
  if (userD.status === "failed") {
    topCommGraph = <p>This Failed</p>;
    topCommScoreGraph = <p>This Failed</p>;
    topPostGraph = <p>This Failed</p>;
    topPostScoreGraph = <p>This Failed</p>;
    loader=null
    failed = true
  }

  return (
    <>
    <Container>
      <Grid textAlign="center" columns={3} divided padded='vertically'>
        <Grid.Row>
          <h1>User Analysis</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column stretched>
            <Input type='text' placeholder='User Name' disabled={buttonIsDisabled && (loader != null)} onChange={handleInput}>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button type='submit' disabled={buttonIsDisabled && (loader != null)} onClick={handleClick} >Generate Analysis</Button>
        </Grid.Row>
        <Grid.Row padded='vertically' stretched>
          {buttonIsDisabled && loader}
        </Grid.Row>
        {failed &&
        <Grid.Row>
          <Card fluid>
            <Card.Content textAlign="center">
              <h1>The user could not be found!</h1>
            </Card.Content>
          </Card>
        </Grid.Row>}
        {loader === null && !failed &&
        <>
        <Grid.Row>
            <Card fluid>
              <Card.Content>
                {userInfo}
              </Card.Content>
            </Card>
        </Grid.Row>
        <Grid.Row>
            <Card fluid>
              <Card.Content textAlign="center"><h1>Comment Statistics</h1></Card.Content>
              <Card.Content>
                {commStat}
              </Card.Content>
              <Card.Content>
                {lowestCommInfo}
              </Card.Content>
              <Card.Content>
                {highestCommInfo}
              </Card.Content>
            </Card>
        </Grid.Row>
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
                <Card.Content textAlign="center"><h1>Post Statistics</h1></Card.Content>
                <Card.Content>
                    {postStat}
                </Card.Content>
                <Card.Content>
                    {lowestPostInfo}
                </Card.Content>
                <Card.Content>
                    {highestPostInfo}
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