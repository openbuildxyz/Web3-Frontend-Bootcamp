import { useState, useEffect } from 'react';
import Header from './Header';
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";
import {taskItemType} from "./types"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import StorageService from "./service.js"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [tasks, setTasks] = useState({ tasks: [] as taskItemType[] })
  useEffect(()=>{
    const cacheTasks = StorageService.getItem('tasks');
    if(Array.isArray(cacheTasks) && cacheTasks.length) {
      setTasks({ tasks: cacheTasks});
    }
  },[])

  const addTasks = (task: string) => {
    const tempTasks: taskItemType[] = tasks["tasks"];
    const taskItem: taskItemType = { id: Date.now().toString(32), text: task, strike: false };
    tempTasks.push(taskItem)
    setTasks({ tasks: tempTasks });
    StorageService.setItem('tasks',tempTasks)
  }

  const removeTasks = (taskid: string) => {
    const tempTasks = tasks["tasks"];
    const result = tempTasks.filter(item=> item.id !== taskid)
    
    setTasks({ tasks: result });
    StorageService.setItem('tasks',result)
  }

  const strikeTask = (taskid: string) => {
    const tempTasks = tasks["tasks"];
    const result = [];
    for (let i = 0; i < tempTasks.length; i++) {
      if (tempTasks[i].id === taskid) {
        const boolVal= tempTasks[i].strike;
        tempTasks[i].strike = !boolVal
      }
      result.push(tempTasks[i]);
    }
    setTasks({ tasks: result });
    StorageService.setItem('tasks',result)
  }

  return (
    <div className='App container text-center'>
      <Header />
      <AddToDo addTaskCallback={addTasks} />
      <ToDoList tasksList={tasks["tasks"]} removeTaskCallback={removeTasks} strikeTaskCallback={strikeTask} />
    </div>
  )
}

export default App
