import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        isActive: false,
        channel: undefined,
    },
    reducers: {
        switchChat: (state, action) => {
            state.isActive = !state.isActive
        },
        openChat: (state, action) => {
            state.isActive = true
        },
        closeChat: (state, action) => {
            state.isActive = false
        },
        openChannel: (state, action) => {
            state.channel = action.payload
        },
        closeChannel: (state, action) => {
            state.channel = null
        },
    }
});

export const {switchChat, openChat, closeChat, openChannel, closeChannel} = chatSlice.actions;
export default chatSlice.reducer;