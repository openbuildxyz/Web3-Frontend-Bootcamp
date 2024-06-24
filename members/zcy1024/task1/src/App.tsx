import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/header'
import AddToDo from './components/add-todo'
import ToDoList from './components/todo-list'

function App() {
    const [list, setList] = useState(localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')!) : []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list));
    }, [list]);

    const addToDo = (content: string) => {
        const newTodoItem = {
            id: Date.now(),
            completed: false,
            content,
        };
        setList([...list, newTodoItem]);
    };

    const clickCheck = (id: number, completed: boolean) => {
        setList(list.map((item: any) => item.id === id ? {...item, completed} : item));
    };

    const clickRemove = (id: number) => {
        setList(list.filter((item: any) => item.id !== id));
    };

    return (
        <div>
            <Header></Header>
            <AddToDo addToDo={addToDo}></AddToDo>
            <ToDoList list={list} clickCheck={clickCheck} clickRemove={clickRemove}></ToDoList>
        </div>
    )
}

export default App
