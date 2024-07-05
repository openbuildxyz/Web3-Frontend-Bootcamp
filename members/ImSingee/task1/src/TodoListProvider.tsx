import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react'
import {Item} from "./todo.ts";

const TodoListContext = createContext<Value | null>(null)

type Value = {
    items: Item[]
    setItems: Dispatch<SetStateAction<Item[]>>
}


export function TodoListProvider({children}: PropsWithChildren) {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        const items = localStorage.getItem('items')
        if (items) {
            setItems(JSON.parse(items))
        }
        setLoading(false)
    }, []);

    useEffect(() => {
        if (loading) return;

        localStorage.setItem('items', JSON.stringify(items))
    }, [loading, items])

    if (loading) {
        return null;
    }

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

