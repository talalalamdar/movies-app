export const addToFavoritesAction = (value) => dispatch => {
    dispatch({
        type: "ADD_TO_FAVORITES",
        payload: value
    })
}

export const removeFromFavoritesAction = (value) => dispatch => {
    dispatch({
        type: "REMOVE_FROM_FAVORITES",
        payload: value
    })
}