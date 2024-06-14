import { useState, useEffect } from "react";
// components
import Header from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";
// types
import { ToDoItemType } from "./types/todo";

function App() {
  const [todoList, setTodoList] = useState<ToDoItemType[]>([]);

  const addToDo = (todo: ToDoItemType) => {
    setTodoList(() => {
      setLocalStorage([todo, ...todoList]);
      return [todo, ...todoList];
    });
  };
  const handleComplete = (id: number) => {
    setTodoList(() => {
      setLocalStorage(
        todoList.map((item) => ({
          ...item,
          state: item.id === id ? !item.state : item.state,
        }))
      );
      return todoList.map((item) => ({
        ...item,
        state: item.id === id ? !item.state : item.state,
      }));
    });
  };

  const handleDelete = (id: number) => {
    setTodoList(() => {
      setLocalStorage(todoList.filter((item) => item.id !== id));
      return todoList.filter((item) => item.id !== id);
    });
  };

  const setLocalStorage = (todoList: ToDoItemType[]) => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  useEffect(() => {
    const localTodoList = localStorage.getItem("todoList");
    if (localTodoList) {
      setTodoList(JSON.parse(localTodoList));
    }
    console.log("执行");
  }, []);
  return (
    <>
      <Header />

      <AddToDo addToDo={addToDo} />

      <ToDoList
        todoList={todoList}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
