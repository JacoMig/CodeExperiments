const initialState = {
    age : 21
};
const reducer = (state = initialState, action) => {
    const newState = {...state}
    if(action.type === "upgrade")
        newState.age++
    if(action.type === "downgrade")
        newState.age--
    return newState
}

export default reducer;