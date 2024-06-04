import { useState } from "react";

import { Header } from "./components/Header";
import { AddToDO } from "./components/AddToDo";
import Context, { IToDo, Status } from "./context";
import { ToDoList } from "./components/ToDoList";

import "./App.css";

function App() {
  const [todos, setToDos] = useState<IToDo[]>([]);
  // 添加
  const addToDo = (title: string) => {
    const newToDo = {
      title,
      id: todos.length + 1,
      status: Status.TODO,
    };

    const newToDos = todos.concat(newToDo);

    setToDos(newToDos);
  };
  // 删除
  const delToDo = (id: number) => {
    const newToDos = todos.filter((item) => item.id !== id);
    setToDos(newToDos);
  };
  // 更新状态
  const toggleToDo = (id: number) => {
    const newToDos = todos.map((item) => {
      if (item.id === id) {
        const status = item.status;
        return {
          ...item,
          status: status === Status.TODO ? Status.COMPLETED : Status.TODO,
        };
      } else {
        return { ...item };
      }
    });
    setToDos(newToDos);
  };
  return (
    <div className="h-screen flex flex-col items-center">
      <Context.Provider
        value={{
          todos,
          addToDo,
          delToDo,
          toggleToDo,
        }}
      >
        <Header></Header>
        <AddToDO></AddToDO>
        <ToDoList></ToDoList>
      </Context.Provider>
    </div>
  );
}

export default App;
