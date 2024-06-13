import { useEffect, useState } from "react";

import { Task } from "types";
import { Header } from "@/components/header";
import { ToDoList } from "@/components/to-do-list";
import { AddToDo } from "./components/add-to-do";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    return localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks")!)
      : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOnAdd = (text: string) => {
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), text: text, isCompleted: false },
    ]);
  };

  const handleToggle = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center h-full p-2 mt-4 gap-y-4">
        <AddToDo onAdd={handleOnAdd} />
        <ToDoList
          tasks={tasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </main>
    </>
  );
}

export default App;
