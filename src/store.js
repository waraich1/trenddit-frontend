import { configureStore } from "@reduxjs/toolkit";
import subredditReducer from "./Pages/Subreddit/subredditSlice";
export default configureStore({
  reducer: {
    subreddit: subredditReducer,
  },
});
