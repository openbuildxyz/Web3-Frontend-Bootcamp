import { useState, useEffect } from 'react';

import viteLogo from '/todo.svg'
import './App.css'

import AddToDo from './pages/AddToDo';
import ToDoList from './pages//ToDoList'; 



function App() {
  const [items, setItems] = useState<{ text: string; completed: boolean }[]>([]);

  // 在组件挂载时从本地存储中恢复待办事项
  useEffect(() => {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('todoItems', JSON.stringify(items));
    }, 1000); // 增加一个延迟以确保在一次更新中只保存一次到本地存储

    console.log('App items:', items);
  
    return () => clearTimeout(timeoutId); // 在组件卸载或下一次更新前清除延迟保存的操作
  }, [items]);


  const handleAdd = (newTodo: { text: string; completed: boolean }) => {
    setItems([...items, newTodo]);
  };

  const handleDelete = (index: number) => {
    const newItems = items.slice(); // 创建一个新的项目数组
    newItems.splice(index, 1); // 从新的项目数组中删除指定索引的项目
    setItems(newItems); // 更新待办事项列表
  
    // 更新本地存储中的待办事项列表
    localStorage.setItem('todoItems', JSON.stringify(newItems));
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      {/* <h1>Vite + React</h1> */}
      <div className="card">
        <AddToDo onAddToDo={handleAdd} />
          
      </div>

      <div className="todo-list-box">

          <ToDoList items={items} setItems={setItems} onDelete={handleDelete} />
      </div>
      <p className="read-the-docs">
      </p>
    </>
  )
}

export default App
