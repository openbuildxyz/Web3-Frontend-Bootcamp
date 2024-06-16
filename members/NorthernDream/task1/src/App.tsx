import { useState } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import Header from "./Header";
import AddToDo from "./AddToDo";

function App() {
  return (
    <>
      <Header />
      <div>
        <AddToDo />
        <ToDoList />
      </div>
    </>
  );
}

export default App;
