import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";

import Header from "./components/Header";

function App() {
  const [tasks, setTasks] = useState([]);
  var loading = false;
  useEffect(() => {
    loading = true;

    const jsonText = localStorage.getItem("tasks");
    console.log("11:", jsonText);
    const savedTasks = JSON.parse(jsonText);
    console.log("22:", savedTasks);
    if (savedTasks) {
      const myTasks = [];
      savedTasks.forEach((element) => {
        const newTask = {
          id: element.id,
          name: element.name,
          completed: element.completed,
        };
        myTasks.push(newTask);
      });

      setTasks(myTasks);
      console.log("22aa:", myTasks);
      console.log("22bb:", tasks);
      console.log("22cc:", savedTasks);
    }

    loading = false;
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("33aa:", tasks);
      const jsonText = JSON.stringify(tasks);
      console.log("33:", jsonText);
      localStorage.setItem("tasks", jsonText);
    }
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
