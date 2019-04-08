const initialState = {
    finishedMovies: []
}

export const finishedReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FINISHED":
            return { ...state, finishedMovies: [...state.finishedMovies, action.payload] }
        case "REMOVE_FROM_FINISHED":
            return { ...state, finishedMovies: action.payload }
        default:
            return state
    }
}