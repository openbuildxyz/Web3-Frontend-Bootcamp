import { useState, useEffect } from 'react';
import InputTask from "./InputTask";
import ListTasks from "./ListTasks";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import StorageService from "./service.js"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


type taskItemType = {
  id: number;
  text: string;
  strike: boolean;
}

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
    const taskItem: taskItemType = { id: tempTasks.length + 1, text: task, strike: false };
    tempTasks.push(taskItem)
    setTasks({ tasks: tempTasks });
    StorageService.setItem('tasks',tempTasks)
  }

  const removeTasks = (taskid: number) => {
    const tempTasks = tasks["tasks"];
    const result: taskItemType[] = [];
    for (let i = 0; i < tempTasks.length; i++) {
      console.log(tempTasks[i].id, taskid);
      if (tempTasks[i].id !== +taskid) {
        result.push(tempTasks[i]);
      }
    }
    setTasks({ tasks: result });
    StorageService.setItem('tasks',tempTasks)
  }

  const strikeTask = (taskid: number) => {
    const tempTasks = tasks["tasks"];
    const result = [];
    for (let i = 0; i < tempTasks.length; i++) {
      if (tempTasks[i].id === +taskid) {
        const boolVal= tempTasks[i].strike;
        tempTasks[i].strike = !boolVal
      }
      result.push(tempTasks[i]);
    }
    setTasks({ tasks: result });
    StorageService.setItem('tasks',tempTasks)
  }

  return (
    <div className='App container text-center'>
      <InputTask addTaskCallback={addTasks} />
      <ListTasks tasksList={tasks["tasks"]} removeTaskCallback={removeTasks} strikeTaskCallback={strikeTask} />
    </div>
  )
}

export default App
