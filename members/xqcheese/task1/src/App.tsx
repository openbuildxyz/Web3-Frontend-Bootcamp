import { useState,useEffect } from 'react'
import Header from './Header.tsx';
import AddToDo from './AddToDo.tsx';
import ToDoList from './ToDoList.tsx';
import './App.css'

interface item {
  id: number;
  content: string;
  isDone: boolean;
};

const App = () => {

  const [items, setItems] = useState<item[]>(() => {
    return localStorage.getItem('items')? JSON.parse(localStorage.getItem('items')!) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error(error);
    }
  }, [items]);

  const addTodo = (content: string) => {
    const newItem = {
      id: Date.now(),
      content,
      isDone: false,
    };
    setItems([...items, newItem]);
  };

  const toggleComplete = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, isDone: !item.isDone } : item));
  };

  const deleteTodo = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      {/* Header component */}
      <Header></Header>
      {/* AddToDo component */}
      <AddToDo addTodo={addTodo}></AddToDo>
      {/* show item list */}
      <ToDoList items={items} toggleComplete={toggleComplete} deleteTodo={deleteTodo}></ToDoList>
    </div>
  );
};

export default App;