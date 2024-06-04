import React from 'react';

function ToDoItem({ todo, deleteToDo, toggleComplete }) {
  return (
    <li className={todo.completed ? 'to-do-item completed' : 'to-do-item'}>
      <div className="to-do-text" onClick={() => toggleComplete(todo.id)}>
        {todo.text}
      </div>
      <button className="to-do-text" onClick={() => toggleComplete(todo.id)}>
        {todo.completed ? 'done' : 'click to mark as done'}
      </button>
      <div className="to-do-buttons">
        <button className="delete-button" onClick={() => deleteToDo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;