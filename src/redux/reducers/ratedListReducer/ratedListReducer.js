const initialState = {
    movies: []
}

export const ratedListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_RATED_LIST":
            return { ...state, movies: [...state.movies, action.payload] }
        case "REMOVE_FROM_RATED_LIST":
            return { ...state, movies: action.payload }
        default:
            return state
    }
}