import { combineReducers } from "redux"

// importing reducers
import { searchReducer } from "./searchReducer/searchReducer"
import { favoritesReducer } from "./favoriteReducer/favoritesReducer"
import { planReducer } from "./planReducer/planReducer"
import { ratedListReducer } from "./ratedListReducer/ratedListReducer"
import { finishedReducer } from "./finishedReducer/finishedReducer"


export default combineReducers({
    searchReducer,
    favoritesReducer,
    planReducer,
    ratedListReducer,
    finishedReducer,
})