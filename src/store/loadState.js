const loadState = (initialState, name) => {
    let state = initialState;
    if(window.localStorage.getItem(`app_state_${name}`)) state = JSON.parse(window.localStorage.getItem(`app_state_${name}`));
    return state;
}

export default loadState