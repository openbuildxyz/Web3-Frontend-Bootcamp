import React from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface ToDoItemProps {
    todo: Todo;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleTodo }) => {
    return (
        <li>
            <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    onClick={() => toggleTodo(todo.id)}
>
    {todo.text}
    </span>
    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
);
}

export default ToDoItem;