const INITIAL_VALUE = {
    loading: false,
    error: null,
    languagePicker: false,
    language: 'Python',
    modalOpened: false,
    modalContent: {
        type: undefined,
        data: undefined
    },
    sidePanel: {
        opened: false,
        type: undefined,
        data: undefined
    },
    selectedChallenge: undefined,
    code: undefined
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
        case 'SET_SELECTED_CHALLENGE':
            return {
                ...state,
                selectedChallenge: payload
            }
        case 'SET_SIDE_PANEL':
            return {
                ...state,
                sidePanel: payload
            }
        case 'SET_CODE':
            return {
                ...state,
                code: payload
            }
        default:
            return state
    }
}
export default utilsReducer