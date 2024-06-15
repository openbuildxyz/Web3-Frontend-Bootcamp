import React from "react";
import ToDoItem from "../ToDoItem.tsx/ToDoItem";

interface ToDoListProps {
    todos: { text: string; completed: boolean} [];
    toggleTodo: (index: number) => void;
    deleteTodo: (index: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <div>
            {todos.map((todo, index) =>(
                <ToDoItem
                    key={index}
                    todo={todo}
                    toggleTodo={() => toggleTodo(index)}
                    deleteTodo={() => deleteTodo(index)}
                />
            ))}
        </div>
    );
};

export default ToDoList;