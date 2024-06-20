import React from 'react';
import ToDoItem from './ToDoItem';

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
}

interface ToDoListProps {
    toDos: ToDo[];
    deleteToDo: (id: number) => void;
    toggleToDo: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ toDos, deleteToDo, toggleToDo }) => {
    return (
        <ul>
            {toDos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} deleteToDo={deleteToDo} toggleToDo={toggleToDo} />
            ))}
        </ul>
    );
};

export default ToDoList;
