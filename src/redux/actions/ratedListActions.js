export const addToRatedList = (value) => dispatch => {
    dispatch({
        type: "ADD_TO_RATED_LIST",
        payload: value
    })
}

export const removeFromRatedList = (value) => dispatch => {
    dispatch({
        type: "REMOVE_FROM_RATED_LIST",
        payload: value
    })
}