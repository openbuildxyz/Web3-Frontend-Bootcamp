import { useState, useEffect } from "react";
import Header from "./Header";
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoListItem";

let nextId = 1;
const initialTasks = [
  { id: Date.now(), text: '买MEME币', done: true },
];


export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todolist_db");
    if (storedTodos) {
      setTasks(JSON.parse(storedTodos));
    }
  }, []);

  function refreshDB(data) {
    const local = JSON.stringify(data)
    localStorage.setItem("todolist_db", local);
  }


  function handleAddTask(text) {
    const timestamp = Date.now();
    const newTask = [...tasks,{
      id: timestamp,
      text: text,
      done: false,
    }];
    setTasks(newTask);
    refreshDB(newTask);
  }

  function handleChangeTask(task) {
    //console.log(task);
    const newTask = tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
    //console.log(newTask);
    setTasks(newTask);
    refreshDB(newTask);

  }

  function handleDeleteTask(taskId) {
    const newTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(newTasks);
    refreshDB(newTasks);
  }

  return (
    <div className="container">
      <Header />
      <AddToDo onAddTask={handleAddTask} />
      <ToDoList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}