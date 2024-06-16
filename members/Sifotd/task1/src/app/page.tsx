"use client"
import Image from "next/image";
import styles from "./page.module.css";
import  TodoList  from "@/components/TodoList";
import   AddTodo from "@/components/AddTodo";
import TodoFilter from "@/components/TodoFilter";
import {  useState } from "react";
import { Todo } from "@/types";
import { title } from "process";
export default function Home() {
  const[todos,setTodos]= useState<Todo []>([]);
  const [filter,setFilter] = useState('all');
  const addTodo = (text:string)=>{
    const newTodo = {
      id:Date.now(),
      text,
      completed:false 
    }
   setTodos  ([...todos,newTodo])
  }

  const deleteTodo = (id:number)=>{
    setTodos(todos.filter((todo)=>todo.id !== id))
  }

  const toggleTodo = (id:number)=>{
setTodos(todos.map((todo)=>{
    if(todo.id === id){
     todo.completed = !todo.completed;
      }
      return todo;
}))
  }

const getFilteredTodos = ()=>{
  switch(filter){
    case 'completed':
      return todos.filter(todo=>todo.completed)
    case 'active':
      return todos.filter(todo=>!todo.completed)
    default:
      return todos;
  }
}
  return (
    <div>
      <h1>TodoList</h1>
      <AddTodo addTodo={addTodo}></AddTodo> 
       <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo}></TodoList> 
      { <TodoFilter setFilter={setFilter}></TodoFilter> }
    </div>
    
  )
}