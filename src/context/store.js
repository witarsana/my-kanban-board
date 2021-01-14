import React, { createContext, useReducer } from 'react';
import { ListReducer } from '../reducers/ListReducers';
const cards = [
    { id: 'card-1', title: 'Learning how to code' },
    { id: 'card-2', title: 'Reading a book' },
    { id: 'card-3', title: 'Gym workout' },
]
const initialState = {
    lists: {
        "list-1": {
            id: "list-1",
            title: "Backlog",
            cards: cards
        },
        "list-2": {
            id: "list-2",
            title: "On Progress",
            cards: []
        }
    },
    listIds: ["list-1", "list-2"]
}
export const DataContext = createContext();

export const DataProvider = (props) => {
    const [store, dispatchStore] = useReducer(ListReducer, initialState);
    return (
        <DataContext.Provider value={{ store, dispatchStore }}>
            {props.children}
        </DataContext.Provider>
    )
}
