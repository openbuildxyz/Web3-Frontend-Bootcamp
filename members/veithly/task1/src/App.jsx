import { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

const App = () => {
  const [todos, setTodos] = useState([]);

  // 从本地存储恢复数据
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // 保存数据到本地存储
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, 1000);
  }, [todos]);

  const addToDo = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteToDo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="app">
      <Header />
      <AddToDo addToDo={addToDo} />
      <ToDoList todos={todos} deleteToDo={deleteToDo} toggleComplete={toggleComplete} />
    </div>
  );
};

export default App;