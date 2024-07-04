import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/TodoList";
import "./index.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddToDo = (text) => {
    const newToDo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newToDo]);
  };

  const handleToggleToDo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteToDo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <Header />
      <AddToDo onAdd={handleAddToDo} />
      <ToDoList
        items={todos}
        onToggle={handleToggleToDo}
        onDelete={handleDeleteToDo}
      />
    </div>
  );
}

export default App;
