// 引入所需模块和组件
import React, { useState, useEffect } from 'react';   //引入react库及其钩子
import Header from './Header';  //处理头部的组件
import ToDoList from './ToDoList';  //待办事项列表
import AddToDo from './AddToDo';  //添加待办事项功能
import './App.css'; // 确保路径和文件名正确，引入样式文件

function App() {
  //todos状态变量，存储所有待办事项
  //settodos，获取存储的待办的事项
  //useState从localStorage获取待办事项，如果不存在则转化为空
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);

  //useEffect在todos状态发生变化时，将todos的当前状态存储到localStorage中
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  //addTodo：接受一个文本参数 text，创建一个新的待办事项对象 newTodo，并使用 setTodos 将其添加到 todos 状态中
  const addTodo = text => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  //toggleTodo：接受待办事项的 id，找到匹配的待办事项，并切换其 completed 状态
  const toggleTodo = id => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  //removeTodo：接受待办事项的 id，过滤掉匹配的待办事项
  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <AddToDo onAddTodo={addTodo} />
      <ToDoList todos={todos} onToggleTodo={toggleTodo} onRemoveTodo={removeTodo} />
    </div>
  );
}

//export default App;
export default App;
