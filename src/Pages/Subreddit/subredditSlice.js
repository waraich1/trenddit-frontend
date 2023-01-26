import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getSubredditData = createAsyncThunk(
  "asyncRedux/subredditData",
  async () => {
    const result = await axios.get("http://127.0.0.1:500/subreddit_comments");
    return result.data.data;
  }
);

const subredditSlice = createSlice({
  name: "subredditSlice",
  initialState: {
    data: {},
    status: "idle",
    authError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSubredditData.pending, (state, action) => {
        state.status = "loading";
        state.authError = false;
        state.data = action.payload;
      })
      .addCase(getSubredditData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authError = false;
        state.data = action.payload;
      })
      .addCase(getSubredditData.rejected, (state, action) => {
        state.status = "failed";
        state.authError = true;
        state.data = null;
      });
  },
});

export default subredditSlice.reducer;
