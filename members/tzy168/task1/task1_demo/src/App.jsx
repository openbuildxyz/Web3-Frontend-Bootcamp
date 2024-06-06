import React, { useState, useEffect } from 'react';
import Header from './Header';
import ToDoList from './ToDoList';
import AddToDo from './AddToDo';

const App = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [inputText, setInputText] = useState('');
  useEffect(() => {
    const savedItems = localStorage.getItem('toDoItems');
    //console.log(savedItems);
    if (savedItems) {
      setToDoItems(JSON.parse(savedItems));
    }
  }, []);

  const addItem = (text) => {
    const id=Math.random();
    setToDoItems([...toDoItems, { id: id, text, completed: false }]);
    localStorage.setItem('toDoItems', JSON.stringify([...toDoItems, { id: id, text, completed: false }]));
    setInputText("");
  };

  const onDelete = (itemId) => {
    setToDoItems(toDoItems.filter((item) => item.id!== itemId));
    localStorage.setItem('toDoItems', JSON.stringify(toDoItems.filter((item) => item.id!== itemId)));
    //localStorage.setItem('toDoItems', JSON.stringify([...toDoItems, { id: id, text, completed: false }]));

  };

  const onToggle = (itemId) => {
    setToDoItems(
      toDoItems.map((item) =>
        item.id === itemId? {...item, completed:!item.completed} : item
      )
    );
  };

  return (
    <div className="app-container">
      <Header />
      <AddToDo addItem={addItem} inputText={inputText} setInputText={setInputText} />
      <ToDoList toDoItems={toDoItems} onDelete={onDelete} onToggle={onToggle}/>
    </div>
  );
};

export default App;