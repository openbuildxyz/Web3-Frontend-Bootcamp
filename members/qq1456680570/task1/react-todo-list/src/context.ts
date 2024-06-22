// UserContext.js
import React from 'react';
import { TodoItem } from './components/todo-list-item';

interface globalDataProps {
    todoList: TodoItem[];
    handleAdd: Function;
    handleRemove: Function;
}
const globalDataContext = React.createContext<globalDataProps>({
    todoList: [],
    handleAdd: () => {},
    handleRemove: () => {}
})

export const GlobalProvider = globalDataContext.Provider;
export const GlobalConsumer = globalDataContext.Consumer;
export const useGlobal = () => React.useContext(globalDataContext)

export default globalDataContext;