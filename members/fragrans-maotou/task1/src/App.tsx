import './App.css'
import Header from "./components/header"
import AddToDo from "./components/add-todo"
import ToDoList from "./components/todo-list"
import { useState } from "react"
import { localStroage } from "./utils"
function App() {

  const [todolist, seToDoList] = useState(() => {
    return localStroage.get("todolist")
  });
  const addToDo = (todo: any) => {
    seToDoList(todolist.concat(todo))
  }
  return (
    <>
      <Header title={"Maotou-ToDo"}></Header>
      <>
        <AddToDo addToDo={addToDo}></AddToDo>
        <ToDoList todolist={todolist} setToDoList={seToDoList}></ToDoList>
      </>
    </>
  )
}

export default App
