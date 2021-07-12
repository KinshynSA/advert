import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: false,
    },
    reducers: {
        switchChat: (state, action) => {
            state.chat = action.payload
        },
    }
});

export const {switchChat} = chatSlice.actions;
export default chatSlice.reducer;