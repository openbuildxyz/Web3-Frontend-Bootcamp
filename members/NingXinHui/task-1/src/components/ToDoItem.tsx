// src/components/ToDoItem.tsx
import React from 'react';

interface ToDo {
    text: string;
    completed: boolean;
}

interface ToDoItemProps {
    todo: ToDo;
    deleteTodo: () => void;
    toggleComplete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleComplete }) => {
    return (
        <li className={todo.completed ? 'completed' : ''}>
            <span onClick={toggleComplete}>{todo.text}</span>
            <div className='button' onClick={deleteTodo}>×</div>
        </li>
    );
};

export default ToDoItem;