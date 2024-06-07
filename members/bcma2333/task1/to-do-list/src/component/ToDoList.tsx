import React from 'react';
import ToDoItem from './ToDoItem';
import { ToDo } from './entity/ToDo';


interface ToDoListProps {
    items: ToDo[];
    deleteToDo: (id: number) => void;
}

export const ToDoList: React.FC<ToDoListProps> = ({ items, deleteToDo }) => {
    console.log(deleteToDo);
    return (
        <ul>
            {items.map((item, index) => (
                <ToDoItem key={index} item={item} deleteToDo={deleteToDo}/>
            ))}
        </ul>
    );
}

export default ToDoList;