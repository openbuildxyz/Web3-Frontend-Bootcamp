import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import './Style.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  // 初始化todos
  useEffect(() => {
    // 从本地存储中获取待办事项
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      // 设置为初始待办事项
      setTodos(savedTodos);
    }
  }, []);

  // 每次todos更新时，将todos保存到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加待办事项
  const addTodo = (text) => {
    const newTodos = [...todos, { text, completed: false }];
    setTodos(newTodos);
  };

  // 删除待办事项
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    // 第一个参数是待删除的元素的起始索引，第二个参数是要删除的元素个数
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // 完成待办事项
  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className='container'>
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default App;