import React, { useState, useEffect } from 'react';
import './App.css'
import Header from './Header'
import AddToDo from './AddToDo'
import ToDoList from './ToDoList'

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [
      { id: 1, text: '学习 React', completed: false },
      { id: 2, text: '去购物', completed: true },
    ];
  });

  // 删除待办事项的函数
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 切换待办事项完成状态的函数
  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleAddTodo = (newTodoText) => {
    // 将新的待办事项添加到状态数组中
    const newTodo = {
      id: todos.length + 1, // 简单生成 ID
      text: newTodoText,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };


  // 侦听待办事项列表的变化，并保存到 localStorage
  useEffect(() => {
    let todostring = JSON.stringify(todos)
    console.log(todostring);
    
    localStorage.setItem('todos',todostring );
  }, [todos]);
  return (
    <>
      <Header></Header>

      <div className="card">
      <AddToDo onAdd ={handleAddTodo} /> 
        <ToDoList
        todos={todos}
        onTodoDelete={handleDeleteTodo}
        onTodoToggle={handleToggleTodo}
      />
      </div>
     
    </>
  )
}

export default App
