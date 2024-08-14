import { useState } from 'react';
import InputTask from "./InputTask";
import ListTasks from "./ListTasks";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

type taskItemType = {
  id: number;
  text: string;
  strike: boolean;
}

function App() {
  const [tasks, setTasks] = useState({ tasks: [] as taskItemType[] })

  const addTasks = (task: string) => {
    const tempTasks: taskItemType[] = tasks["tasks"];
    const taskItem: taskItemType = { id: tempTasks.length + 1, text: task, strike: false };
    tempTasks.push(taskItem)
    setTasks({ tasks: tempTasks });
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
  }

  const strikeTask = (taskid: number) => {
    const tempTasks = tasks["tasks"];
    const result = [];
    for (let i = 0; i < tempTasks.length; i++) {
      if (tempTasks[i].id === +taskid) {
        tempTasks[i].strike = true
      }
      result.push(tempTasks[i]);
    }
    setTasks({ tasks: result });
  }

  return (
    <div className='App container text-center'>
      <InputTask addTaskCallback={addTasks} />
      <ListTasks tasksList={tasks["tasks"]} removeTaskCallback={removeTasks} strikeTaskCallback={strikeTask} />
    </div>
  )
}

export default App
