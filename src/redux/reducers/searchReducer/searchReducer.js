
const initialState = {
    searchQuery: "",
    moviesList: []
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MOVIE_SEARCH_QUERY_CHANGE":
            return { ...state, searchQuery: action.payload }
        case "GET_ALL_MOVIES":
            return { ...state, moviesList: [...action.payload] }
        default:
            return state
    }
}
