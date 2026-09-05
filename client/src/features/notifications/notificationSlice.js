import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as notificationAPI from "./notificationAPI";

const errorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong.";
export const fetchNotifications = createAsyncThunk("notifications/fetch", async (_, thunkAPI) => {
  try { return (await notificationAPI.getNotificationsRequest()).data.data; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const markNotificationRead = createAsyncThunk("notifications/read", async (id, thunkAPI) => {
  try { return (await notificationAPI.markNotificationReadRequest(id)).data.data.notification; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const markAllNotificationsRead = createAsyncThunk("notifications/readAll", async (_, thunkAPI) => {
  try { await notificationAPI.markAllNotificationsReadRequest(); }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const deleteNotification = createAsyncThunk("notifications/delete", async (id, thunkAPI) => {
  try { await notificationAPI.deleteNotificationRequest(id); return id; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
const notificationSlice = createSlice({
  name: "notifications",
  initialState: { items: [], unreadCount: 0, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchNotifications.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchNotifications.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.notifications; state.unreadCount = action.payload.unreadCount; })
    .addCase(fetchNotifications.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(markNotificationRead.fulfilled, (state, action) => { state.items = state.items.map((item) => item._id === action.payload._id ? action.payload : item); state.unreadCount = Math.max(0, state.unreadCount - 1); })
    .addCase(markAllNotificationsRead.fulfilled, (state) => { state.items.forEach((item) => { item.isRead = true; }); state.unreadCount = 0; })
    .addCase(deleteNotification.fulfilled, (state, action) => {
      const notification = state.items.find((item) => item._id === action.payload);
      if (notification && !notification.isRead) state.unreadCount = Math.max(0, state.unreadCount - 1);
      state.items = state.items.filter((item) => item._id !== action.payload);
    }),
});
export default notificationSlice.reducer;
