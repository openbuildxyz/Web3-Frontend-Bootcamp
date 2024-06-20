import React from 'react';
import { ToDo } from '../App';

interface ToDoItemProps {
    todo: ToDo;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleComplete}) => {
    return (
        <li style= {{padding: 10}}>
            <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => toggleComplete(todo.id)}
            >
                {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default ToDoItem;