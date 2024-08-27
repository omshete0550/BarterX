import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.currentUser = null;
            state.error = false;
        },
        updateUser: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
    }
})

export const { loginStart, loginSuccess, loginFailure, logOut, updateUser } = userSlice.actions;
export default userSlice.reducer;