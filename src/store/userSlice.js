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
            state.email = JSON.parse(action.payload).email
        },
    }
});

export const {changeUser} = userSlice.actions;
export default userSlice.reducer;