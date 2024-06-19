import React from "react";

interface ToDoItemProps {
    todo: { text: string; completed: boolean};
    toggleTodo: () => void;
    deleteTodo: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <div>
            <input type="checkbox" checked={todo.completed} onChange={toggleTodo} />
            <span>{todo.text}</span>
            <button onClick={deleteTodo}>删除</button>
        </div>
    );
};

export default ToDoItem;