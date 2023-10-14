const INITIAL_VALUE = {
    loading: false
}

const utilsReducer = (action, state = INITIAL_VALUE) => {
    if(!action)
        return state
    const {type, payload} = action
    switch (type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}
export default utilsReducer