
import './App.css'
import ToDoList from './components/ToDoList'
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import { useState } from 'react'

function App() {
    const [title] = useState('我的待办事项')
    const [list, setList] = useState([
        { index: 1, msg: '运动三十分钟' },
        { index: 2, msg: '看书三十分钟' }
    ]);

    const addNewToDo = (msg: string) => {
        console.log('msg', msg);

        const newToDo = { index: list.length + 1, msg };
        setList([...list, newToDo]);
    };
    const deleteToDo = (index: number) => {
        console.log('App index', index);
        setList(list.filter(item => item.index !== index));
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
