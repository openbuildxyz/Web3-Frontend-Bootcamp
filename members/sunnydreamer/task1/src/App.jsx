import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';



function App() {

  const [tasks, setTasks] = useState([])
  const addTask = (task) => {

    const newTask = {
      name: task,
      checked: false // Default to unchecked
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    if (localStorage.tasks) {
      setTasks(JSON.parse(localStorage.tasks));
    }
  }, [])



  return (
    <div className='appContainer'>
      <Header />
      <AddToDo addTask={addTask} />
      <ToDoList tasks={tasks} deleteTask={deleteTask} />

    </div>
  )
}

export default App
