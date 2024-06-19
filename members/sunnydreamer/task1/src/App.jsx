import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';

function App() {
  const [tasks, setTasks] = useState([])

  // ADD TASK
  const addTask = (task) => {
    const newTask = {
      id: uuidv4(),
      name: task,
      checked: false // Default to unchecked
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // DELETE TASK
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // prevent invalid tasks initially stored in local storage
  const validateTasks = (tasks) => {
    if (Array.isArray(tasks)) {
      return tasks.every(task =>
        task.hasOwnProperty('id') &&
        task.hasOwnProperty('name') &&
        task.hasOwnProperty('checked')
      );
    }
    return false;
  };

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (validateTasks(storedTasks)) {
        setTasks(storedTasks);
      } else {
        // if there is invalid tasks inside the local storage, clear it
        console.error('Invalid task format in localStorage. Clearing tasks.');
        localStorage.removeItem('tasks');
      }
    } catch (e) {
      console.error('Error loading tasks from localStorage', e);
      localStorage.removeItem('tasks');
    }
  }, []);

  return (
    <div className='appContainer'>
      <Header />
      <AddToDo addTask={addTask} />
      <ToDoList tasks={tasks} deleteTask={deleteTask} setTasks={setTasks} />

    </div>
  )
}

export default App
