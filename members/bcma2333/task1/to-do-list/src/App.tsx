import { useState, useEffect } from 'react';
import './App.css'
import AddToDo from './component/AddToDo';
import Header from './component/Header'
import ToDoList from './component/ToDoList';
import { ToDo } from './component/entity/ToDo';


function App() {
  const [toDoItems, setToDoItems] = useState<ToDo[]>(() => {
    var initialItems = localStorage.getItem('todos');
    return initialItems ? JSON.parse(initialItems) : []; 
  });

  useEffect(() => {
    toDoItems.sort((a:ToDo, b:ToDo) => a.id - b.id);
    localStorage.setItem('todos', JSON.stringify(toDoItems));
  }, [toDoItems]);

  const handleAddToDo = (text: string) => {
    const newItem : ToDo = {
      id: Date.now(),
      text,
      isCompleted: false
    };
    setToDoItems([...toDoItems, newItem]);
  };

  const deleteToDo = (id: number) => {
    var initialItems = localStorage.getItem('todos');
    var savedTodos : ToDo[]= initialItems ? JSON.parse(initialItems) : [];
    setToDoItems(savedTodos.filter(todo => todo.id !== id));
   };

  return (
    <>
      <Header/>
      <AddToDo onAdd={handleAddToDo} />
      <ToDoList items={toDoItems} deleteToDo={deleteToDo}/>
    </>
  )
}

export default App
