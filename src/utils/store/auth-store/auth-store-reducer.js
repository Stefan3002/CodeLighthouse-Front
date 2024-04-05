const INITIAL_VALUE = {
    status: 'idle',
    isLoggedIn: true,
    user: null,
    token: null,
    expireDate: null
}

// 300 minutes
export const authExpireDate = new Date().getTime() + (300 * 60 * 1000)

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
        case 'SET_TOKEN':
            return {
                ...state,
                token: payload
            }
        case 'SET_EXPIRE_DATE':
            return {
                ...state,
                expireDate: payload
            }
        default:
            return state
    }
}
export default authReducer
