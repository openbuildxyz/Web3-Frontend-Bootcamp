import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";
import { ToDo } from "./types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addToDo = (text: string) => {
    const newToDo: ToDo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newToDo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteToDo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateToDo = (id: number, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <Header />
        <AddToDo addToDo={addToDo} />
        <ToDoList
          items={todos}
          toggleComplete={toggleComplete}
          deleteToDo={deleteToDo}
          updateToDo={updateToDo}
        />
      </div>
    </div>
  );
};

export default App;
