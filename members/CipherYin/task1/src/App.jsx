import './App.css'
import AddToList from './components/AddToDo/AddToList';
import Header from './components/header/Header'
import { useState,useEffect } from 'react';
import ToDoList from './components/ToDoList/toDoList';

function App() {
  const [todo,setTodo] = useState([]);
  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem('todo'));
    // console.log("本地存储",storedTodo)
    if (storedTodo) {
      // console.log("恢复前",storedTodo)
      if (storedTodo.length === 0) {
        return
      }
      setTodo(storedTodo);
      // console.log("本地恢复",todo)
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
    // console.log("todo变化: ",localStorage)
  }, [todo]);
  const addTodo = (text) => {
    // console.log('add 收到的参数： ',text)
    setTodo([...todo, { id: Date.now(),completed: false, text }]);
    // console.log("添加成功后的： ",todo)
  };

  const addHadCompleted = (id)=>{
    console.log(todo,id)
    const newTodos = todo.map((todoItem)=>{
      return todoItem.id===id?{...todoItem,completed: !todoItem.completed}:todoItem;
    })
    setTodo(newTodos);
    console.log(newTodos)
  }

  const removeTodo = (id) => {
    setTodo(todo.filter(todoItem => todoItem.id !== id));
  };



  return (
    <>
      <Header/>
      <AddToList onAdd={addTodo}/>
      <ToDoList todo={todo} removeTodo = {removeTodo} addHadCompleted={addHadCompleted}/>
    </>
  )
}

export default App
