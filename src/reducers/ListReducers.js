import uuid from 'react-uuid';
export const ListReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_LIST":
            const curLists = state.lists;
            const newListId = `list-${state.listIds.length + 1}`;
            const newListItem = {
                id: newListId,
                title: payload,
                cards: []
            }

            return {
                ...state,
                lists: { ...curLists, [newListId]: newListItem },
                listIds: [...state.listIds, newListId]
            }
        case "CHANGE_TITLE":
            const item = state.lists[payload.id];
            item.title = payload.text;
            const newStore = {
                ...state,
                ...state.lists, [payload.id]: item
            }
            return newStore;
        case "DELETE_CARD":
            const list = state.lists[payload.idList];
            list.cards = list.cards.filter(card => card.id !== payload.idCard);
            return {
                ...state,
                ...state.lists, [payload.idList]: list
            }
        case "EDIT_CARD":
            const listEdit = state.lists[payload.idList];
            const idxEdit = listEdit.cards.findIndex(item => item.id === payload.idCard);
            const editItem = {
                id: payload.idCard,
                title: payload.text
            }
            listEdit.cards.splice(idxEdit, 1, editItem);
            return {
                ...state,
                ...state.lists, [payload.idList]: listEdit
            }
        case "ADD_CARD":
            const listNew = state.lists[payload.idList];
            const newItem = {
                id: `card-${uuid()}`,
                title: payload.text
            }
            listNew.cards = [...listNew.cards, newItem];

            return {
                ...state,
                ...state.lists, [payload.idList]: listNew
            }
        case "MOVE_CARD":
            //curentItem
            const currentList = state.lists[payload.idList];
            const currenItem = currentList.cards[payload.idxDestination];
            const moverItem = currentList.cards.find(it => it.id === payload.idCard);

            currentList.cards.splice(payload.idxDestination, 1, moverItem);
            currentList.cards.splice(payload.idxSource, 1, currenItem);


            return {
                ...state,
                ...state.lists,
                [payload.idList]: currentList
            };

        case "MOVE_CARD_ANOTHER":
            //curentItem
            const { destination, source, idCard } = payload;
            const destList = state.lists[destination.droppableId];
            const sourList = state.lists[source.droppableId];

            const mvItem = sourList.cards.find(sr => sr.id === idCard);
            mvItem.id = uuid();

            sourList.cards.splice(source.index, 1);
            destList.cards = [...destList.cards, mvItem];

            const newLists = {
                ...state.lists,
                [destination.droppableId]: destList,
                [source.droppableId]: sourList
            }
            return {
                ...state,
                lists: newLists
            }
        default:
            return state;
    }
}