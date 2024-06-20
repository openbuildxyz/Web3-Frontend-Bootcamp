import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './Header.jsx';

// App组件
function App() {
  const [todos, setTodos] = useState(() => {
    // 从本地存储加载待办事项
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    // 将待办事项保存到本地存储
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加待办事项
  const addTodo = (todo) => {
    setTodos([...todos, { id: Date.now(), text: todo, completed: false }]);
  };

  // 删除待办事项
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 标记完成
  const toggleComplete = (id) => {
      // 更新待办事项的完成状态
  const updatedTodos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  // 将待办事项重新排序：未完成的在前，已完成的在后
  const sortedTodos = updatedTodos.sort((a, b) => {
    return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
  });

  // 更新待办事项列表
  setTodos(sortedTodos);
  };

  return (
    <>
      <Header />
      <div className='toDoList'>
      <AddTodo onAdd={addTodo} />
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleComplete} />
      ))}
      </div>
    </>
  )
}


// 待办事项
function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <span className='toDoText' style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button className='deleteToDo' onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

// 添加待办事项
function AddTodo({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button className='add' type="submit">Add</button>
    </form>
  );
}

export default App;