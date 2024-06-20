import "./App.css";
import Header from "./Header";
import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";
import { useState, useEffect } from "react";

type itemTask = {
  task: string;
  isDone: boolean;
};

function App() {
  const [toDoList, setToDoList] = useState(localStorage.getItem("toDoList") ? JSON.parse(localStorage.getItem("toDoList") as string) : []);
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  const addItemToList = (item: itemTask) => {
    const list: itemTask[] = [...toDoList, item];
    setToDoList(list);
  };

  const updateToDoList = (list: itemTask[]) => {
    setToDoList(list);
  };

  return (
    <>
      <Header />
      <AddToDo addItemToList={addItemToList} />
      <ToDoList toDoList={toDoList} updateToDoList={updateToDoList} />
    </>
  );
}

export default App;
