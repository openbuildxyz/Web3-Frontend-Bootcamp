import React from 'react';
import ToDoItem from './ToDoItem';

interface Todo {
    text: string;
    completed: boolean;
}

interface ToDoListProps {
    todos: Todo[];
    removeTodo: (index: number) => void;
    toggleComplete: (index: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, removeTodo, toggleComplete }) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <ToDoItem
                    key={index}
                    index={index}
                    todo={todo}
                    removeTodo={removeTodo}
                    toggleComplete={toggleComplete}
                />
            ))}
        </ul>
    );
};

export default ToDoList;