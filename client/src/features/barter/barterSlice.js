import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as barterAPI from "./barterAPI";

const errorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong.";
export const fetchBarterRequests = createAsyncThunk("barter/fetch", async (_, thunkAPI) => {
  try {
    const [incoming, outgoing] = await Promise.all([barterAPI.getIncomingBarterRequests(), barterAPI.getOutgoingBarterRequests()]);
    return { incoming: incoming.data.data.requests, outgoing: outgoing.data.data.requests };
  } catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const submitBarterRequest = createAsyncThunk("barter/create", async (details, thunkAPI) => {
  try { return (await barterAPI.createBarterRequest(details)).data.data.barterRequest; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const changeBarterStatus = createAsyncThunk("barter/status", async ({ id, status }, thunkAPI) => {
  try { return (await barterAPI.updateBarterRequest(id, status)).data.data.barterRequest; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const completeBarter = createAsyncThunk("barter/complete", async (id, thunkAPI) => {
  try { return (await barterAPI.completeBarterRequest(id)).data.data.barterRequest; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});

const replaceRequest = (state, request) => {
  ["incoming", "outgoing"].forEach((key) => {
    state[key] = state[key].map((item) => item._id === request._id ? { ...item, ...request } : item);
  });
};
const barterSlice = createSlice({
  name: "barter",
  initialState: { incoming: [], outgoing: [], loading: false, submitting: false, error: null },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchBarterRequests.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchBarterRequests.fulfilled, (state, action) => { state.loading = false; state.incoming = action.payload.incoming; state.outgoing = action.payload.outgoing; })
    .addCase(fetchBarterRequests.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(submitBarterRequest.pending, (state) => { state.submitting = true; state.error = null; })
    .addCase(submitBarterRequest.fulfilled, (state, action) => { state.submitting = false; state.outgoing.unshift(action.payload); })
    .addCase(submitBarterRequest.rejected, (state, action) => { state.submitting = false; state.error = action.payload; })
    .addCase(changeBarterStatus.fulfilled, (state, action) => replaceRequest(state, action.payload))
    .addCase(completeBarter.fulfilled, (state, action) => replaceRequest(state, action.payload)),
});

export default barterSlice.reducer;
