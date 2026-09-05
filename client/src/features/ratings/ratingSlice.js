import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRatingRequest } from "./ratingAPI";

export const submitRating = createAsyncThunk("ratings/create", async (details, thunkAPI) => {
  try { return (await createRatingRequest(details)).data.data.rating; }
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Unable to submit rating."); }
});

const ratingSlice = createSlice({
  name: "ratings",
  initialState: { submitting: false, error: null },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(submitRating.pending, (state) => { state.submitting = true; state.error = null; })
    .addCase(submitRating.fulfilled, (state) => { state.submitting = false; })
    .addCase(submitRating.rejected, (state, action) => { state.submitting = false; state.error = action.payload; }),
});

export default ratingSlice.reducer;
