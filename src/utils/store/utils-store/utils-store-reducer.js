const INITIAL_VALUE = {
    loading: false,
    error: null,
    languagePicker: false,
    language: 'javascript',
    modalOpened: false,
    modalContent: undefined
}

const utilsReducer = (state = INITIAL_VALUE, action) => {
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
        case 'SET_MODAL_OPENED':
            return {
                ...state,
                modalOpened: payload
            }
        case 'SET_MODAL_CONTENT':
            return {
                ...state,
                modalContent: payload
            }
        default:
            return state
    }
}
export default utilsReducer