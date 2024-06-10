import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

  const updateTodoList = (title) => {
    setTodos([...todos, { title, id: uuidv4(), status: 0 }]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Header />
      <AddTodo todos={todos} setTodos={setTodos} />
      {todos.length ? <TodoList todos={todos} setTodos={setTodos} /> : null}
    </>
  );
}

export default App;
