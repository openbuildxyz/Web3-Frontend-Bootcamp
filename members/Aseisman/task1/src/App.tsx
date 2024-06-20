import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import AddToDo from './components/AddToDo'
import { Item } from './type'

function App() {
  let savedItems = localStorage.getItem('items');
  if(savedItems){
    savedItems = JSON.parse(savedItems);
  }
  const [items, setItems] = useState((savedItems || []) as Item[])
  const [maxId, setMaxId] = useState(-1);

  useEffect(()=>{
    setMaxId(Math.max(...items.map(item=>item.id), -1));
    localStorage.setItem('items', JSON.stringify(items));
  },[items])

  return (
    <div className="wrap-panel">
      <Header name='ToDoList'/>
      <ToDoList setItems={setItems} items={items} />
      <AddToDo setItems={setItems} items={items} maxId={maxId}/>
    </div>
  )
}

export default App
