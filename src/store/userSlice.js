import { createSlice } from "@reduxjs/toolkit";
import loadState from '../store/loadState.js';

export const userSlice = createSlice({
    name: 'user',
    initialState: loadState({
        user: false,
        email: '',
    }, 'user'),
    reducers: {
        changeUser: (state, action) => {
            state.user = true;
            state.id = JSON.parse(action.payload).uid
            state.name = JSON.parse(action.payload).displayName;
            state.email = JSON.parse(action.payload).email;
        },
        logOut: (state, action) => {
            state.user = false;
            state.id = undefined;
            state.name = undefined;
            state.email = undefined;
        },
    }
});

export const {changeUser, logOut} = userSlice.actions;
export default userSlice.reducer;