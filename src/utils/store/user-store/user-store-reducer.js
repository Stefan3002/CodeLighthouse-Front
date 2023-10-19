const INITIAL_VALUE = {
    user: null
}

const userReducer = (action, state = INITIAL_VALUE) => {
    if(!action)
        return state
    const {type, payload} = action
    switch (type) {
        case 'SET_USER':
            return {
                ...state,
                user: payload
            }
        default:
            return state
    }
}
export default userReducer