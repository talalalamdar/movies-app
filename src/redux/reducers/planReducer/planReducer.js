const initialState = {
    moviesPlan: []
}

export const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_PLAN":
            return { ...state, moviesPlan: [...state.moviesPlan, action.payload] }
        case "REMOVE_FROM_PLAN":
            return { ...state, moviesPlan: action.payload }
        default:
            return state
    }
}