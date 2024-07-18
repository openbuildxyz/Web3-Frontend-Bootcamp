import { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

export interface todoItem {
  id: number;
  text: string;
  fullfilled: boolean;
}
function App() {
  const [todolist, setTodolist] = useState<todoItem[]>(() => {
    const storeTodoList = localStorage.getItem("todolist");
    return storeTodoList ? JSON.parse(storeTodoList) : [];
  });

  useEffect(() => {
    console.log("store");
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }, [todolist]);

  const handleAddTodo = (text: string) => {
    setTodolist([
      ...todolist,
      {
        id: Date.now(),
        text,
        fullfilled: false,
      },
    ]);
  };

  const handleTodoFilled = (id: number) => {
    const updatedTodos = todolist.map((item) =>
      item.id === id
        ? {
            ...item,
            fullfilled: !item.fullfilled,
          }
        : item
    );
    setTodolist(updatedTodos);
  };

  const handleDeleteItem = (id: number) => {
    setTodolist(todolist.filter((item) => item.id !== id));
  };
  return (
    <>
      <Header />
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList
        todolist={todolist}
        handleDeleteItem={handleDeleteItem}
        handleTodoFilled={handleTodoFilled}
      />
    </>
  );
}

export default App;
