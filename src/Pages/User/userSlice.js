import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getUserData = createAsyncThunk(
  "asyncRedux/userData",
  async (params) => {
    const result = await axios.get("http://127.0.0.1:500/author_details", {
      params: params,
    });
    console.log(params)
    return result.data.data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    status: "idle",
    authError: null,
    data: {}
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserData.pending, (state, action) => {
        state.status = "loading";
        state.authError = false;
        state.data = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authError = false;
        state.data = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "failed";
        state.authError = true;
        state.data = null;
      })
  },
});

export default userSlice.reducer;
