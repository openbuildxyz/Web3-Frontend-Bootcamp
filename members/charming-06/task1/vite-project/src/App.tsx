
import './App.css'
import ToDoList from './components/ToDoList'
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import { useEffect, useState } from 'react'
// 定义接口
interface todoItemProps {
    index: number;
    msg: string;
    status: boolean;
}
function App() {
    // 从缓存中取出待办事项
    const data = localStorage.getItem("list");
    const result = data ? JSON.parse(data) : [];
    const [list, setList] = useState(result);
    const [title] = useState('我的待办事项')
    
    useEffect(() => {
        // 在这里使用更新后的值
        console.log('list updated:', list);
        localStorage.setItem("list", JSON.stringify(list));
    }, [list]); // 依赖于 list

    // 增加一个待办事项
    const addNewToDo = (msg: string, status: boolean) => {
        const newToDo = { index: list.length + 1, msg, status };
        setList([...list, newToDo]);
    };
    // 删除一个待办事项
    const deleteToDo = (index: number) => {
        setList(list.filter((item: todoItemProps) => item.index !== index));
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
