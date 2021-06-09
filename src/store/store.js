import { configureStore } from "@reduxjs/toolkit";

import langReducer from './langSlice.js';
import userReducer from './userSlice.js';

const store = configureStore({
    reducer: {
        lang: langReducer,
        user: userReducer,
    }
});

const saveState = (state) => {
    for (let key in state){
        window.localStorage.setItem(`app_state_${key}`, JSON.stringify(state[key]))
    }
}

store.subscribe(() => {
    console.log(store.getState())
    saveState(store.getState());
})

export default store;