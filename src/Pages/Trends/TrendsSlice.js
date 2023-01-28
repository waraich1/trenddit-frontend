import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from 'qs'
import { useSelector } from "react-redux";


export const getTrendsData = createAsyncThunk(
  "asyncRedux/trendsData",
  async () => {
    const trendsDropdown = useSelector((state) => state.trends.trendDropdown);
    const subredditDropdown = useSelector((state) => state.trends.subredditDropdown);

    const result = await axios.get("http://127.0.0.1:500/trend_posts", {
        params: {trends: trendsDropdown, subreddits:subredditDropdown},
        paramsSerializer: params => {
            return qs.stringify(params)
          }});
    return result.data.data;
  }
);

const trendsSlice = createSlice({
    name: "trendsSlice",
    initialState: {
      data: {},
      status: "idle",
      authError: null,
      trendDropdown: [],
      subredditDropdown: [],
      selectedTrendDropdown: null,
      selectedSubredditDropdown: null
    },
    reducers: {
        addTrendDropdown: (state, action) => {
            if (!state.trendDropdown.includes(action.payload)){ 
            state.trendDropdown.push(action.payload)
            }
        },
        addSubredditDropdown: (state, action) => {
            if (!state.subredditDropdown.includes(action.payload)){ 
                state.subredditDropdown.push(action.payload)
                }
        },
        setSelectedTrendDropdown: (state, action) => {state.selectedTrendDropdown = action.payload},
        setSelectedSubredditDropdown: (state, action) => {state.selectedSubredditDropdown = action.payload},
        resetEverything: (state, action) => {
            state.trendDropdown = []
            state.subredditDropdown = []
            state.selectedTrendDropdown = null
            state.selectedSubredditDropdown = null
            state.data = {}
        }

    },
    extraReducers(builder) {
      builder
        .addCase(getTrendsData.pending, (state, action) => {
          state.status = "loading";
          state.authError = false;
          state.data = action.payload;
        })
        .addCase(getTrendsData.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.authError = false;
          state.data = action.payload;
        })
        .addCase(getTrendsData.rejected, (state, action) => {
          state.status = "failed";
          state.authError = true;
          state.data = null;
        });
    },
  });
  
  export default trendsSlice.reducer;

  export const {addTrendDropdown, addSubredditDropdown, setSelectedTrendDropdown, setSelectedSubredditDropdown, resetEverything} = trendsSlice.actions;