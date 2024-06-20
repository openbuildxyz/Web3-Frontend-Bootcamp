import React from 'react';

interface Todo {
    text: string;
    completed: boolean;
}

interface ToDoItemProps {
    todo: Todo;
    index: number;
    removeTodo: (index: number) => void;
    toggleComplete: (index: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, index, removeTodo, toggleComplete }) => {
    return (
        <li>
            <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => toggleComplete(index)}
            >
                {todo.text}
            </span>
            <button onClick={() => removeTodo(index)}>删除</button>
        </li>
    );
};

export default ToDoItem;