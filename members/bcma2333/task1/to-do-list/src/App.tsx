import { useState, useEffect } from 'react';
import './App.css'
import AddToDo from './component/AddToDo';
import Header from './component/Header'
import ToDoList from './component/ToDoList';
import { ToDo } from './component/entity/ToDo';


function App() {
  const [toDoItems, setToDoItems] = useState<ToDo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDoItems));
  }, [toDoItems]);

  const handleAddToDo = (text: string) => {
    const newItem = {id:Date.now(), text};
    setToDoItems([...toDoItems, newItem]);
  };

  const deleteToDo = (id: number) => {
    setToDoItems(toDoItems.filter(todo => todo.id !== id));
  };

  return (
    <>
      <Header/>
      <AddToDo onAdd={handleAddToDo} />
      <ToDoList items={toDoItems} deleteToDo={deleteToDo} />
    </>
  )
}

export default App
