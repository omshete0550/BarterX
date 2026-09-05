import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as messageAPI from "./messageAPI";

const errorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong.";
export const fetchConversations = createAsyncThunk("messages/conversations", async (_, thunkAPI) => {
  try { return (await messageAPI.getConversationsRequest()).data.data.conversations; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const createConversation = createAsyncThunk("messages/createConversation", async (participantId, thunkAPI) => {
  try { return (await messageAPI.createConversationRequest(participantId)).data.data.conversation; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const fetchMessages = createAsyncThunk("messages/list", async (conversationId, thunkAPI) => {
  try { return { conversationId, messages: (await messageAPI.getMessagesRequest(conversationId)).data.data.messages }; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const sendMessage = createAsyncThunk("messages/send", async (details, thunkAPI) => {
  try { return (await messageAPI.sendMessageRequest(details)).data.data.message; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
const messageSlice = createSlice({
  name: "messages",
  initialState: { conversations: [], messagesByConversation: {}, onlineUserIds: [], loading: false, sending: false, error: null },
  reducers: {
    setOnlineUsers: (state, action) => { state.onlineUserIds = action.payload; },
    setUserOnline: (state, action) => { if (!state.onlineUserIds.includes(action.payload)) state.onlineUserIds.push(action.payload); },
    setUserOffline: (state, action) => { state.onlineUserIds = state.onlineUserIds.filter((id) => id !== action.payload); },
  },
  extraReducers: (builder) => builder
    .addCase(fetchConversations.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchConversations.fulfilled, (state, action) => { state.loading = false; state.conversations = action.payload; })
    .addCase(fetchConversations.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(createConversation.fulfilled, (state, action) => { if (!state.conversations.some((item) => item._id === action.payload._id)) state.conversations.unshift(action.payload); })
    .addCase(fetchMessages.fulfilled, (state, action) => { state.messagesByConversation[action.payload.conversationId] = action.payload.messages; })
    .addCase(sendMessage.pending, (state) => { state.sending = true; })
    .addCase(sendMessage.fulfilled, (state, action) => {
      state.sending = false;
      const conversationId = action.payload.conversation;
      state.messagesByConversation[conversationId] = [...(state.messagesByConversation[conversationId] || []), action.payload];
    })
    .addCase(sendMessage.rejected, (state, action) => { state.sending = false; state.error = action.payload; }),
});
export default messageSlice.reducer;
export const { setOnlineUsers, setUserOnline, setUserOffline } = messageSlice.actions;
