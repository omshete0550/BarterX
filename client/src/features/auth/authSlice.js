import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearAccessToken, setAccessToken } from "../../api/accessToken";
import { getMeRequest, loginRequest, logoutRequest, refreshSessionRequest, registerRequest, updateProfileRequest } from "./authAPI";

const getErrorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong.";

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try { return (await loginRequest(credentials)).data.data; }
  catch (error) { return thunkAPI.rejectWithValue(getErrorMessage(error)); }
});
export const register = createAsyncThunk("auth/register", async (details, thunkAPI) => {
  try { return (await registerRequest(details)).data.data; }
  catch (error) { return thunkAPI.rejectWithValue(getErrorMessage(error)); }
});
export const restoreSession = createAsyncThunk("auth/restore", async (_, thunkAPI) => {
  try { return (await refreshSessionRequest()).data.data; }
  catch (error) { return thunkAPI.rejectWithValue(getErrorMessage(error)); }
});
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try { await logoutRequest(); }
  catch (error) { return thunkAPI.rejectWithValue(getErrorMessage(error)); }
});
export const getMyProfile = createAsyncThunk("auth/getMyProfile", async (_, thunkAPI) => {
  try { return (await getMeRequest()).data.data.user; }
  catch (error) { return thunkAPI.rejectWithValue(getErrorMessage(error)); }
});
export const updateMyProfile = createAsyncThunk("auth/updateMyProfile", async (details, thunkAPI) => {
  try { return (await updateProfileRequest(details)).data.data.user; }
  catch (error) { return thunkAPI.rejectWithValue(getErrorMessage(error)); }
});

const saveSession = (state, action) => {
  state.loading = false;
  state.checking = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.error = null;
  setAccessToken(action.payload.token);
};
const clearSession = (state) => {
  state.user = null;
  state.token = null;
  state.checking = false;
  state.error = null;
  clearAccessToken();
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, checking: true, error: null },
  reducers: { clearAuthError: (state) => { state.error = null; } },
  extraReducers: (builder) => builder
    .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(login.fulfilled, saveSession)
    .addCase(register.fulfilled, saveSession)
    .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(restoreSession.fulfilled, saveSession)
    .addCase(restoreSession.rejected, clearSession)
    .addCase(logout.pending, clearSession)
    .addCase(logout.fulfilled, clearSession)
    .addCase(logout.rejected, clearSession)
    .addCase(getMyProfile.fulfilled, (state, action) => { state.user = action.payload; })
    .addCase(updateMyProfile.fulfilled, (state, action) => { state.user = action.payload; }),
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
