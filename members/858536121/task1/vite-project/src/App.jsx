import { useState } from "react";
import "./App.css";
import Header from "./todoComponents/Header";
import AddToDo from "./todoComponents/AddToDo";

function App() {
  const [todoList, setTodoList] = useState([]);
  const onAddClick = (val) => {
    if (val) {
      todoList.push({ label: val, isOK: false });
      setTodoList([...todoList]);
      console.log(todoList);
    }
  };
  return (
    <>
      <div className={"header"}>
        <Header />
      </div>
      <AddToDo onAddClick={onAddClick} />
    </>
  );
}

export default App;
