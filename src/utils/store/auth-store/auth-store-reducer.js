const INITIAL_VALUE = {
    status: 'idle',
    isLoggedIn: true,
    user: null
}

const authReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: payload
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: payload
            }
        default:
            return state
    }
}
export default authReducer
