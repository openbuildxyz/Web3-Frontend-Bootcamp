import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import ToDoList from './components/toDoList'
import AddToDo from './components/addToDo'

// 定义待办事项的类型
interface TodoItem {
  content: string;
  completed: boolean;
}

function App() {
  // 从本地存储初始化状态，如果没有则使用空数组
  const [list, setList] = useState<TodoItem[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 添加任务
  const addTask = (task: TodoItem) => {
    setList([...list, task]);
  }

  // 更新列表（用于完成和删除操作）
  const changeList = (newList: TodoItem[]) => {
    setList(newList);
  }

  // 使用 useEffect 监听 list 变化，自动保存到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(list));
    console.log('待办事项已保存到本地存储:', list);
  }, [list]);

  return (
    <>
      <div>
        <Header title="Todo-List" />
         <ToDoList list={list} changeList={changeList} />
         <AddToDo addTask={addTask} />
      </div>
    </>
  )
}

export default App
