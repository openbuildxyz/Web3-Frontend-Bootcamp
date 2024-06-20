import { useEffect, useState } from "react";
import "./App.css";
import Header from "./todoComponents/Header";
import AddToDo from "./todoComponents/AddToDo";
import ToDoList from "./todoComponents/ToDoList";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList(JSON.parse(window.localStorage.getItem("todoList")) || []);
  }, []);
  setTimeout(() => {
    console.log(todoList);
  }, 1000);

  const onAddClick = (val) => {
    if (val) {
      todoList.push({ label: val, isOK: false, id: Number(new Date()) });
      saveTodoList();
    }
  };
  const onDoOK = (index) => {
    console.log("onDoOK", index);
    todoList[index].isOK = !todoList[index].isOK;
    saveTodoList();
  };
  const onDel = (index) => {
    console.log("onDel", index);
    todoList.splice(index, 1);
    saveTodoList();
  };
  const saveTodoList = () => {
    setTodoList([...todoList]);
    window.localStorage.setItem("todoList", JSON.stringify(todoList));
  };
  return (
    <>
      <div className={"header"}>
        <Header />
      </div>
      <AddToDo onAddClick={onAddClick} />
      <div style={{ marginTop: "10px" }}>
        <ToDoList todoList={todoList} onDoOK={onDoOK} onDel={onDel} />
      </div>
    </>
  );
}

export default App;
