import React,{useState,useEffect} from 'react'
import ToDoItem from '/src/components/ToDoItem.jsx'
import '../index.css'
function ToDoList() {
  
  const [newTask,setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [tasks, setTasks] = useState(() =>{
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { taskName: "take a shower", isDone: false },
      { taskName: "eat breakfast", isDone: false },
      { taskName: "play video games", isDone: false },
      { taskName: "go to sleep", isDone: false }
    ];
  });  

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      console.log("tasks restored");
      console.log(localStorage.getItem("tasks"));
    }else{
      console.log("no tasks to restore");
    }
  }, []); 

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));
    //console.log("tasks updated");
    //console.log(localStorage.getItem("tasks"));
  }, [tasks]); 


  //////////////////////////////
  //  Change Events Handler   //
  //////////////////////////////
  function handleInputChange(event) {
	setNewTask(event.target.value);
  }

  //////////////////////////////
  //  Click Events Handler    //
  //////////////////////////////
  function addTask() {
    if(newTask.trim() !== ""){
      const taskToAdd = {taskName: newTask, isDone: false}
      setTasks(t => [...t,taskToAdd]);
      setNewTask("");
    }
  }
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }
  
  function moveTaskUp(index) {
    if(index > 0){
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if(index < tasks.length - 1){
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function toggleTaskStatus(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleTaskClick(index) {
    const task = tasks[index];
    setSelectedTask(task);
  }
  function closeTask() {
    setSelectedTask(null);
  }
  return (
  <div className="to-do-list">
	<div>
		<input type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange}/>
    <button className="add-button" onClick={addTask}>Add Task</button>
	</div>
    <ol>
      {tasks.map((task,index) => (
        <li key={index}>
          <input type="checkbox" checked={task.isDone} onChange={() => toggleTaskStatus(index)} />
          <span className="text" onClick={() => handleTaskClick(index)}>{task.taskName}</span>
          <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
          <button className="move-button" onClick={() => moveTaskUp(index)}>☝️</button>
          <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>

        </li>
      ))}
    </ol>
    {selectedTask && (
        <div className="todo-item-modal">
        <button className="close-button" onClick={closeTask}>X</button>
        <ToDoItem taskName={selectedTask.taskName} isDone={selectedTask.isDone}/>
      </div>
    )}
  </div>)
}

export default ToDoList