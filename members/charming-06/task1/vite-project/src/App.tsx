
import './App.css'
import ToDoList from './components/ToDoList'
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import { useState } from 'react'

function App() {
    // 从缓存中取出待办事项
    const data = localStorage.getItem("list");
    const result = data ? JSON.parse(data) : [];
    const [list, setList] = useState(result);
    const [title] = useState('我的待办事项')

    const addNewToDo = (msg: string, status: boolean) => {
        console.log('msg', msg);

        const newToDo = { index: list.length + 1, msg, status };
        setList([...list, newToDo]);
    };
    const deleteToDo = (index: number) => {
        console.log('App index', index);
        const result = list.filter(item => item.index !== index);
        setList(result);
        localStorage.setItem("list", JSON.stringify(result));
    };

    return (
        <div className='container'>
            <Header title={title}></Header>
            {/* 所有的待办事项 */}
            <ToDoList list={list} deleteToDo={deleteToDo} />
            <AddToDo addNewToDo={addNewToDo} />
        </div>
    )
}

export default App
