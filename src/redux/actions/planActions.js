export const addToPlan = (value) => dispatch => {
    dispatch({
        type: "ADD_TO_PLAN",
        payload: value
    })
} 

export const removeFromPlan = (value) => dispatch => {
    dispatch({
        type: "REMOVE_FROM_PLAN",
        payload: value
    })
}