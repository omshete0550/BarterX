import { loginFailure, loginStart, loginSuccess, updateUser } from "./slices/userSlice";
import axios from 'axios';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://barterx.onrender.com/auth/login");
        // console.log(res);    
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(loginFailure());
    }
};

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        await axios.post("https://barterx.onrender.com/auth/register", user);
        const username = user.username;
        const password = user.password;
        login(dispatch, { username, password });
    }
    catch (err) {
        dispatch(loginFailure());
    }
};
export const update = async (dispatch, user) => {
    try {
        const details = await axios.put(`https://barterx.onrender.com/users/${user.id}`, user);
        const updtduser = {
            details: { ...details.data }
        };
        dispatch(updateUser(updtduser));
    } catch (err) {
        console.log(err)
    }
};