import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getSubredditCommentData = createAsyncThunk(
  "asyncRedux/subredditCommentData",
  async (params) => {
    const result = await axios.get("http://127.0.0.1:500/subreddit_comments", params=params);
    console.log(params)
    return result.data.data;
  }
);

export const getSubredditPostData = createAsyncThunk(
  "asyncRedux/subredditPostData",
  async (params) => {
    const result = await axios.get("http://127.0.0.1:500/subreddit_posts", params=params);
    console.log(params)
    return result.data.data;
  }
);

const subredditSlice = createSlice({
  name: "subredditSlice",
  initialState: {
    data: {
      CommentData: {
        status: "idle",
        authError: null,
        data: {}
      },
      PostData: {
        status: "idle",
        authError: null,
        data: {}
      }
    },

  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSubredditCommentData.pending, (state, action) => {
        state.data.CommentData.status = "loading";
        state.data.CommentData.authError = false;
        state.data.CommentData.data = action.payload;
      })
      .addCase(getSubredditCommentData.fulfilled, (state, action) => {
        state.data.CommentData.status = "succeeded";
        state.data.CommentData.authError = false;
        state.data.CommentData.data = action.payload;
      })
      .addCase(getSubredditCommentData.rejected, (state, action) => {
        state.data.CommentData.status = "failed";
        state.data.CommentData.authError = true;
        state.data.CommentData.data = null;
      })
      .addCase(getSubredditPostData.pending, (state, action) => {
        state.data.PostData.status = "loading";
        state.data.PostData.authError = false;
        state.data.PostData.data = action.payload;
      })
      .addCase(getSubredditPostData.fulfilled, (state, action) => {
        state.data.PostData.status = "succeeded";
        state.data.PostData.authError = false;
        state.data.PostData.data = action.payload;
      })
      .addCase(getSubredditPostData.rejected, (state, action) => {
        state.data.PostData.status = "failed";
        state.data.PostData.authError = true;
        state.data.PostData.data = null;
      });
  },
});

export default subredditSlice.reducer;
