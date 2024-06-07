import "./App.css";
import Header from "./components/Header.tsx";
import AddToDo from "./components/AddToDo.tsx";
import { useEffect, useState } from "react";
import ToDoList from "./components/ToDoList.tsx";

function App() {
  const [todos, setTodos] = useState<string[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  const onAddTodo = (todo: string) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  const onDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Header />
      <AddToDo onAddTodo={onAddTodo} />
      <ToDoList todos={todos} onDeleteTodo={onDeleteTodo} />
    </>
  );
}

export default App;
