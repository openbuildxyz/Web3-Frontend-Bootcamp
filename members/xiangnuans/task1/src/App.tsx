import "./App.css";

import { useEffect, useState } from "react";

import AddToDo from "./components/AddToDo";
import Header from "./components/Header";
import { TODOProps } from "./components/ToDoItem";
import ToDoList from "./components/ToDoList";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    setTodos([...todos, { title, completed: false }]);
  };

  const toggleComplete = (index: number) => {
    const newTodos = todos.map((todo: TODOProps, i: number) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_: TODOProps, i: number) => i !== index);
    setTodos(newTodos);
  };

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="app">
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
      <button onClick={clearTodos} className="clear-button">
        清空所有待办事项
      </button>
    </div>
  );
}

export default App;
