import { useEffect, useState } from "react";
import { Task } from "./interfaces";
import Header from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    return localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks") as string)
      : [];
  });

  const onAdd = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  const onDelete = (task: Task) => {
    const newTasks = [...tasks].filter((item) => item.id !== task.id);
    setTasks(newTasks);
  };

  const onToggle = (task: Task) => {
    const newTasks = [...tasks];
    newTasks.forEach((item) => {
      if (item.id === task.id) {
        item.done = !item.done;
      }
    });
    const unDoneTasks = newTasks
      .filter((item) => !item.done)
      .sort((a, b) => b.id - a.id);
    const doneTasks = newTasks.filter((item) => item.done);
    setTasks([...unDoneTasks, ...doneTasks]);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <Header>To Do</Header>
      <AddToDo onAdd={onAdd}></AddToDo>
      <ToDoList
        tasks={tasks}
        onDelete={onDelete}
        onToggle={onToggle}
      ></ToDoList>
    </div>
  );
}

export default App;
