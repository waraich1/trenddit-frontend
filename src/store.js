import { configureStore } from "@reduxjs/toolkit";
import subredditReducer from "./Pages/Subreddit/subredditSlice";
import trendReducer from "./Pages/Trends/TrendsSlice";
import userReducer from "./Pages/User/userSlice";
export default configureStore({
  reducer: {
    subreddit: subredditReducer,
    trends: trendReducer,
    user: userReducer
  },
});
