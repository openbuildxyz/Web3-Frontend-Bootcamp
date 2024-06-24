import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header.jsx";
import TodoList from "./components/to-do-list.jsx";
import AddTodo from "./components/add-to-do.jsx";

function App() {
  const getData = () => {
    const savedData = localStorage.getItem("todo");
    return savedData ? JSON.parse(savedData) : [];
  };

  const [toDos, setTodos] = useState(getData);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(toDos));
  }, [toDos]);

  const onAddToDo = val => {
    setTodos([...toDos, val]);
  };

  const deleteTodo = id => {
    const data = toDos.filter(item => item.id !== id);
    setTodos(data);
  };

  const toggleItemComplete = id => {
    const data = toDos.map(item => {
      if (item.id == id) item.complete = true;
      return { ...item };
    });
    setTodos(data);
  };

  return (
    <div>
      <Header />

      <AddTodo onAdd={onAddToDo} />

      <TodoList
        list={toDos}
        deleteTodo={deleteTodo}
        toggleToDoComplete={toggleItemComplete}
      />
    </div>
  );
}

export default App;
