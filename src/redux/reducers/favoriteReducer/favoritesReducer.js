const initialState = {
    myFavoritesMovies: []
}

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            return { ...state, myFavoritesMovies: [...state.myFavoritesMovies, action.payload]}
        case "REMOVE_FROM_FAVORITES": 
            let filteredFavorites = [...state.myFavoritesMovies].filter(movie => movie.id !== action.payload.id)
            return {...state, myFavoritesMovies: [...filteredFavorites]}
        default: 
            return state
    }
}