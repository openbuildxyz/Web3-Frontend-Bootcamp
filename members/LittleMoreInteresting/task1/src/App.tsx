
import './App.css'
import Header from "./components/Header"
import AddToDo from "./components/AddToDo"
import ToDoList from "./components/ToDoList"
import { useState,useEffect  } from 'react'
import ToDoContext from './lib/TodoContext'
import {ToDoItem } from "./lib/data/interface";
import LocalSaveHandler from "./lib/data/local"
import {Divider} from "@nextui-org/divider";
function App() {
  
  const [reload,setReload] = useState(false)
  const [list,setList] = useState<ToDoItem[]>(LocalSaveHandler.list())
  useEffect(()=>{
    function saveData(){
      LocalSaveHandler.save(list)
    }
    if (reload) {
      saveData()
      setReload(false)
    }
  },[reload])
  return (
    <>
    <ToDoContext.Provider value={{
      list,setList,reload,setReload
    }}>
      <Header />
      <AddToDo />
      <Divider />
      <ToDoList />
    </ToDoContext.Provider>
    </>
  )
}

export default App
