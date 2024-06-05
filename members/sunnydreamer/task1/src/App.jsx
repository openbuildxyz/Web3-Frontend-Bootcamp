import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';



function App() {

  const [tasks, setTasks] = useState([])
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])



  return (
    <div className='appContainer'>
      <Header />
      <AddToDo addTask={addTask} />
      <ToDoList tasks={tasks} deleteTask={deleteTask} />

    </div>
  )
}

export default App
