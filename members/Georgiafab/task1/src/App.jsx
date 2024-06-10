import './App.css'
import {useCallback, useEffect, useState} from 'react';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';
import Header from './layout/Header';
function App() {
  const [list, setList] = useState([]) 
  const addTodo = (item) => {
    setList([...list, item])
  }
  const setDone = (updateItem) => {
    setList(prev=> {
      const current = prev.findIndex(item => item.id === updateItem.id)
      const newArr = [...prev]
      newArr.splice(current,1,updateItem)
      return [...newArr]
    })
  }

  const handleDelete = useCallback((id) => {
    setList((prev) => prev.filter(item => item.id !== id))
  }, [setList])


  useEffect(() => {
    let data = []
    try {
      data = JSON.parse(localStorage.getItem('todoList'));
    } catch (error) {
      console.log(error)
    }
    setList(data);
    return () => {
      localStorage.setItem('todoList', JSON.stringify(list))
    }
  }, [])
  window.onbeforeunload=function(){
    localStorage.setItem('todoList', JSON.stringify(list))
  };


  return (
    <>
    <Header />
    <AddToDo addTodo={addTodo}></AddToDo>
    <br />
    <ToDoList list={list} setDone={setDone} handleDelete={handleDelete}></ToDoList>
      
    </>
  )
}

export default App
