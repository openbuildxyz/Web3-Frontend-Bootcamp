import { useState } from 'react';
import InputTask from "./InputTask";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

type taskItemType = {
  id: number;
  text: string;
  strike: boolean;
}

function App() {
  const [tasks, setTasks] = useState({ tasks: [{}] })

  const addTasks = (task: string) => {
    const tempTasks = tasks["tasks"];
    const taskItem: taskItemType = { id: tempTasks.length + 1, text: task, strike: false};
    tempTasks.push(taskItem)
    setTasks({ tasks: tempTasks });
  }

  return (
    <div className='App container text-center'>
      <InputTask addTaskCallback={addTasks} />
    </div>
  )
}

export default App
