import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";

import Header from "./components/Header";

function loadTasks() {
  const jsonText = localStorage.getItem("tasksJson");
  console.log("11:", jsonText);
  const savedTasks = JSON.parse(jsonText);
  console.log("22:", savedTasks);
  if (savedTasks) {
    console.log("22cc:", savedTasks);
    return savedTasks;
  } else {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks());

  //   useEffect(() => {
  //     //
  //   }, []);

  useEffect(() => {
    const jsonText = JSON.stringify(tasks);
    console.log("33:", jsonText);
    localStorage.setItem("tasksJson", jsonText);
  }, [tasks]);
  //   const taskList = ToDoList;
  //   const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  //   const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <Header />

      {/* <div className="filters btn-group stack-exception">{filterList}</div> */}

      {/* <h2 id="list-heading">{headingText}</h2> */}

      <ToDoList tasks={tasks} setTasks={setTasks} />

      <AddToDo tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
