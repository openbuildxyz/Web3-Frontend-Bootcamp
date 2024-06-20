import React from 'react';

function ToDoItem({ todo, deleteToDo, toggleComplete }) {
  return (
  <li className={todo.completed ? 'to-do-item completed' : 'to-do-item'} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
    <div className="to-do-text" onClick={() => toggleComplete(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'gray' : 'inherit' }}>
      {todo.text}
    </div>
    <div className="to-do-buttons">
      <button className="delete-button" onClick={() => deleteToDo(todo.id)}>
        Delete
      </button>
    </div>
  </li>
  );
}

export default ToDoItem;