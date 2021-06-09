import { createSlice } from "@reduxjs/toolkit";
import loadState from './loadState.js';

export const langSlice = createSlice({
    name: 'lang',
    initialState: loadState({
        lang: 'ua',
    }, 'lang'),
    reducers: {
        changeLang: (state, action) => {
            state.lang = action.payload
        },
    }
});

export const {changeLang} = langSlice.actions;
export default langSlice.reducer;