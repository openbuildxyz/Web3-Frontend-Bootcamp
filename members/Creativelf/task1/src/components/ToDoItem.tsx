import React from 'react';

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
}

interface ToDoItemProps {
    todo: ToDo;
    deleteToDo: (id: number) => void;
    toggleToDo: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteToDo, toggleToDo }) => {
    return (
        <li className={todo.completed ? 'completed' : ''}>
      <span
          onClick={() => toggleToDo(todo.id)}
      >
        {todo.text}
      </span>
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
        </li>
    );
};

export default ToDoItem;
