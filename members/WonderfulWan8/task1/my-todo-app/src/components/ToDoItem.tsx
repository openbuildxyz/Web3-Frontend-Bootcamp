// src/components/ToDoItem.tsx
import React from 'react';

interface ToDoItemProps {
    todo: {
        id: number;
        text: string;
        completed: boolean;
    };
    toggleComplete: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <li style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                style={{ marginRight: '10px' }}
            />
            <span
                style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    marginRight: '10px',
                }}>
                {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
        </li>
    );
};

export default ToDoItem;
