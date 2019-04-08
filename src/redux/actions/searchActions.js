export const onSearchAction = (value) => dispatch => {
    dispatch({
        type: "MOVIE_SEARCH_QUERY_CHANGE",
        payload: value
    })
}

export const listSearchedMovies = (value) => dispatch => {
    dispatch({
        type: "GET_ALL_MOVIES",
        payload: value
    })
}

