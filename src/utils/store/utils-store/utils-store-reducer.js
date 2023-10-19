const INITIAL_VALUE = {
    loading: false,
    error: null,
    languagePicker: false,
    language: 'javascript'
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
        case 'SET_ERROR':
            return {
                ...state,
                error: payload
            }
        case 'SET_LANGUAGE_PICKER':
            return {
                ...state,
                languagePicker: payload
            }
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: payload
            }
        default:
            return state
    }
}
export default utilsReducer