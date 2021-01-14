export const changeTitle = (id, text) => {
    return {
        type: "CHANGE_TITLE",
        payload: { text, id }
    }
}
export const addList = (text) => {
    return {
        type: "ADD_LIST",
        payload: text
    }
}

export const deleteCard = (idList, idCard) => {
    return {
        type: "DELETE_CARD",
        payload: { idList, idCard }
    }
}

export const editCard = (idList, idCard, text) => {
    return {
        type: "EDIT_CARD",
        payload: { idList, idCard, text }
    }
}
export const addCard = (idList, text) => {
    return {
        type: "ADD_CARD",
        payload: { idList, text }
    }
}

export const moveCard = (idList, idCard, idxDestination, idxSource) => {
    return {
        type: "MOVE_CARD",
        payload: {
            idList, idCard, idxDestination, idxSource
        }
    }
}

export const moveCardAnother = (idCard, destination, source) => {
    return {
        type: "MOVE_CARD_ANOTHER",
        payload: {
            idCard, destination, source
        }
    }
}