import React, { useState, useEffect } from 'react';
import Header from './Header';

interface TodoItem {
  text: string;
  completed: boolean;
}


interface ToDoListProps {
  items: TodoItem[];
  setItems: React.Dispatch<React.SetStateAction<TodoItem[]>>; // 添加 setItems 作为 prop
  onDelete: (index: number) => void;

}

const ToDoList: React.FC<ToDoListProps> = ({ items, setItems, onDelete }) => {

  useEffect(() => {
    console.log('ToDoList received items:', items);
  }, [items]);


  const handleItemClick = (index: number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], completed: !newItems[index].completed };
    setItems(newItems); // 更新待办事项列表
  };

  const handleDeleteClick = (index: number) => {
    onDelete(index); // 只传递要删除的项目的索引
  };

  return (
    <div className="todo-list-box">
        {/* <ul className="empty-tips">
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
        </ul> */}
        <Header/>  
        <ul className="todo-list">
          {items.map((item, index) => (
              <li draggable="true" 
                  className={`todo-item  ${item.completed ? 'selected' : ''}`}                  
                  key={index}>

                <div 
                  className={`todo-content  ${item.completed ? 'completed' : ''}`}
                >
                  {item.text}
                </div>

                <div 
                  className={`todo-btn  ${item.completed ? 'btn-unfinish' : 'btn-finish'}`}
                  onClick={() => handleItemClick(index)}
                >
                  <img src={item.completed ? 'finish.svg' : ''} alt="" />
                </div>
                <div className="todo-btn btn-delete"  onClick={() => handleDeleteClick(index)}>
                  <img src="delete.svg" alt="" />
                </div>
              </li>
          ))}
        </ul>
    </div>

  );
}

export default ToDoList;
