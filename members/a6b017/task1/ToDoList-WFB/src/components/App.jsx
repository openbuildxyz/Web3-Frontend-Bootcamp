import { useState, useEffect } from "react";
import Header from "./Header";
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoListItem";

let nextId = 1;
const initialTasks = [
  {id: 0, text: '买MEME币', done: true},
];


export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todolist_db");
    if (storedTodos) {
      setTasks(JSON.parse(storedTodos));
    }
  }, []);
  
  function refreshDB(data){
    const local = JSON.stringify(data)
    localStorage.setItem("todolist_db", local);
  }


  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
    refreshDB([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
    console.log([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
    refreshDB(tasks);
    
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
    refreshDB(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <div className="container">
      <Header/>
      <AddToDo onAddTask={handleAddTask}/>
      <ToDoList
      tasks={tasks}
      onChangeTask={handleChangeTask}
      onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}