import React from 'react';

interface ToDoItemProps {
    todo: string;
    isCompleted: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, isCompleted, onToggle, onDelete }) => {
    return (
        <li className="todo-item">
            <span 
                onClick={onToggle} 
                className={isCompleted ? 'completed' : ''} 
            >
                {todo}
            </span>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default ToDoItem;
