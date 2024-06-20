import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import AddToDo from './AddToDo'
import ToDoList from './ToDoList'
import { Item } from './interface'


function App() {
  const [todos, setTodos] = useState<Item[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo:Item) => {
    setTodos([todo, ...todos]);
  };

  const delTodo = (itemId:number)=> {
    const currentTodos = todos.filter((todo) => todo.id != itemId);
    setTodos(currentTodos);
  }

  const changeTodo = (itemId:number)=> {
    const currentItems = todos.map((todo) => {
      if (todo.id === itemId) {
        return {
          ...todo,
          done: !todo.done
        }
      }
      return todo
    });
    setTodos(currentItems);
  }

  return (
    <>
      <Header />
      <AddToDo addToDo={addTodo}/>
      <ToDoList items={todos} onDelete={delTodo} onToggle={changeTodo}/>
    </>
  )
}

export default App
