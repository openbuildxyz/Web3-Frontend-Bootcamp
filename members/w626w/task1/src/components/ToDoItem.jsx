import React from 'react';

const ToDoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li>
            <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTodo(todo.id)}
            >
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default ToDoItem;
