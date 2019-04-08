export const addToFinishedList = (val) => dispatch => {
    dispatch({
        type: "ADD_TO_FINISHED",
        payload: val
    })
}

export const removeFromFinishedList = (val) => dispatch => {
    dispatch({
        type: "REMOVE_FROM_FINISHED",
        payload: val
    })
}