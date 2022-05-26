import { auth as initialState } from "../../initialStates";

const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                token: payload.token,
            }
        case "CLEAR_AUTH":
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null
            }
        default:
            return state
    }
}

export default auth