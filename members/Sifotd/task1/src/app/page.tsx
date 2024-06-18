
"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/AddTodo";
import TodoFilter from "@/components/TodoFilter";
import { Todo } from "@/types";


const loadTodosFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

export default function Home() {
  
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromLocalStorage);
  const [filter, setFilter] = useState
  ('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

   const getFilteredTodos = () => {
     switch(filter){
       case 'completed':
         return todos.filter(todo => todo.completed);
       case 'active':
         return todos.filter(todo => !todo.completed);
       default:
         return todos;
     }
 };

  return (
    <div>
      <h1>TodoList</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={getFilteredTodos()} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <TodoFilter setFilter={setFilter} />
    </div>
  );
}