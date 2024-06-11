import React from 'react';
import ToDoItem from './ToDoItem';

interface ToDo {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface ToDoListProps {
    todos: ToDo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onToggle, onDelete }) => {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <ToDoItem
                    key={todo.id}
                    todo={todo.text}
                    isCompleted={todo.isCompleted}
                    onToggle={() => onToggle(todo.id)}
                    onDelete={() => onDelete(todo.id)}
                />
            ))}
        </ul>
    );
};

export default ToDoList;
