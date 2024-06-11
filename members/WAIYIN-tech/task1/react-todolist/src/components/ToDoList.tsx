import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import AddToDo from './AddToDo';

interface ItemStorage {
  id: string;
  content: string;
  completed: boolean;
}

const ToDoList: React.FC = () => {
  const [items, setItems] = useState<ItemStorage[]>(() => {
    const localItems = localStorage.getItem('items');
    return localItems ? JSON.parse(localItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const onAdd = (content: string) => {
    console.log("onAdd: ", content);
    setItems([...items, {id: performance.now().toString().replace(".", ""), completed: false, content}]);
  }

  const onDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  }

  const onUpdateStatus = (id: string) => {
    setItems(items.map(item => {
      if(item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    }));
  }

  return (
    <div>
      <AddToDo onAdd={onAdd}/>
      <ul>
        {items.map((item)=> {
          return (
            <ToDoItem
                key={item.id}
                id={item.id}
                content={item.content}
                completed={item.completed}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}/>
          )
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
