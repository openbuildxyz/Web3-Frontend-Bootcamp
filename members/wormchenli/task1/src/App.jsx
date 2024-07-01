import { useEffect } from 'react'
import { ToDoList } from '../components/ToDoList'
import {Header} from '../components/Header'
import {InPutArea} from '../components/InPutArea'
import {ToDoItem} from '../components/ToDoItem'
import { useState } from 'react'

function App() {
  const [selectedTask, setSelectedTask] = useState(0)
  const [taskList, setTaskList] = useState([])
  const [editMode, setEditMode] = useState(false)
  
  const updateSelectedTask = (taskID) => {
    setSelectedTask(taskID)
  }
  const addSingleTask = (taskData) => {
    const updatedList = [...taskList, taskData];
    localStorage.setItem('todoList', JSON.stringify(updatedList));
    setTaskList(updatedList)
    setEditMode(false)
  }
  const updateSingleTaskInfo = (singleTaskInfo) => {
    const updatedList = taskList.map(item => {
      if (item.id === singleTaskInfo.id) {
        return { ...item, completed: singleTaskInfo.completed };
      }
      return item;
    });
    localStorage.setItem('todoList', JSON.stringify(updatedList));
    setTaskList(updatedList)
  }

  const deleteSingleTask = (taskID) => {
    const updatedList = taskList.filter(item => item.id !== taskID);
    localStorage.setItem('todoList', JSON.stringify(updatedList));
    setTaskList(updatedList)
  }

  useEffect(()=>{
    const todoList = JSON.parse(localStorage.getItem('todoList')) || []
    setTaskList(todoList)
  },[])

  return (
    <div className="todo-list-page-wrapper">
      <Header />
      <button className='btn btn-add-task' onClick={()=>setEditMode(!editMode)}>Add Task</button>
      <div className='todo-list-body'>
        <ToDoList listData={taskList} selectedTaskHook = {updateSelectedTask} selectedID={selectedTask}/>
        {editMode 
          ? <InPutArea taskUpdateHook = {addSingleTask}/>
          : <ToDoItem taskData = {taskList?taskList.find(item=>item.id === selectedTask):undefined} 
                      taskUpdateHook={updateSingleTaskInfo}
                      taskDeleteHook={deleteSingleTask}/>} 
      </div>
    </div>
  )
}

export default App
