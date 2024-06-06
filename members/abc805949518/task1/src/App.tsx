import { useState,useEffect } from 'react'
import Header from './Header.tsx'
import ToDoList from './ToDoList.tsx'
import AddToDo from './AddToDo.tsx'
import './App.css'

function App() {


  const [listData, setListData] = useState([]);
  useEffect(() => {
    localStorage.getItem('listData') && setListData(JSON.parse(localStorage.getItem('listData') || ''));
  },[])

  return (
    <div>
      <Header/> 
      <AddToDo listData={listData} setListData = {setListData}/> 
      <ToDoList listData={listData} setListData = {setListData}/>
    </div>
  )
}

export default App
