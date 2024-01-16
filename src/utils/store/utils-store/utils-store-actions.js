export const setLoading = (payload) => {
    return {
        type: 'SET_LOADING',
        payload
    }
}
export const setLoadingContent = (payload) => {
    return {
        type: 'SET_LOADING_CONTENT',
        payload
    }
}

export const setError = (payload) => {
    return {
        type: 'SET_ERROR',
        payload
    }
}

export const setLanguagePicker = (payload) => {
    return {
        type: 'SET_LANGUAGE_PICKER',
        payload
    }
}

export const setLanguage = (payload) => {
    return {
        type: 'SET_LANGUAGE',
        payload
    }
}

export const setModal = (payload) => {
    return {
        type: 'SET_MODAL_OPENED',
        payload
    }
}

export const setModalContent = (payload) => {
    return {
        type: 'SET_MODAL_CONTENT',
        payload
    }
}

export const setSelectedChallenge = (payload) => {
    return {
        type: 'SET_SELECTED_CHALLENGE',
        payload
    }
}

export const setSidePanel = (payload) => {
    return {
        type: 'SET_SIDE_PANEL',
        payload
    }
}

export const setCode = (payload) => {
    return {
        type: 'SET_CODE',
        payload
    }
}