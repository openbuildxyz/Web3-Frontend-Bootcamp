import { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: text.trim(),
          completed: false,
        },
      ]);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container">
      <div className="content">
        <Header />
        <div className="todo-container">
          <AddToDo onAdd={addTodo} />
          <ToDoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
