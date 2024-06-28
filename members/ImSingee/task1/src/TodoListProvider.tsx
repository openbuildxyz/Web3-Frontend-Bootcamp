import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState} from 'react'
import {Item} from "./todo.ts";

const TodoListContext = createContext<Value | null>(null)

type Value = {
    items: Item[]
    setItems: Dispatch<SetStateAction<Item[]>>
}


export function TodoListProvider({children}: PropsWithChildren) {
    const [items, setItems] = useState<Item[]>([
        {id: '1', title: 'Buy milk', completed: false},
        {id: '2', title: 'Buy eggs', completed: false},
        {id: '3', title: 'Buy bread', completed: false},
    ])

    return (
        <TodoListContext.Provider value={{items, setItems}}>
            {children}
        </TodoListContext.Provider>
    )
}

export function useTodoItems() {
    const context = useContext(TodoListContext)
    if (!context) {
        throw new Error('useTodoList must be used within a TodoListProvider')
    }
    return context.items
}

export function useSetTodoItems() {
    const context = useContext(TodoListContext)
    if (!context) {
        throw new Error('useSetTodoItems must be used within a TodoListProvider')
    }
    return context.setItems
}

