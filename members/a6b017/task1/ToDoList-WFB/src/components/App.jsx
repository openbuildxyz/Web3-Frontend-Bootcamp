import React, { useState } from "react";
import Header from "./Header";
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoListItem";

let nextId = 3;
const initialTasks = [
  {id: 0, text: '撸空投', done: true},
  {id: 1, text: '看大盘走势', done: false},
  {id: 2, text: '买MEME币', done: false},
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  function handleAddTask(text) {
    setTasks([
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
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
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



