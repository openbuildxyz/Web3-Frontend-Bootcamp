import React from "react";

function ToDoItem({ todo, onToggleTodo, onDeleteTodo }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button className="delete-btn" onClick={() => onDeleteTodo(todo.id)}>
                删除
            </button>
        </li>
    );
}
export default ToDoItem;