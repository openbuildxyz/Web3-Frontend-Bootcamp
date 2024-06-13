import { useState } from "react";
import ToDoItem, { ToDoItemProp } from "./ToDoItem";

interface ToDoListProps {
    todos: ToDoItemProp[];
}
const ToDoList: React.FC<ToDoListProps> = ({ todos: initialTodos }) => {
    const [todos, setTodos] = useState<ToDoItemProp[]>(initialTodos);
    const onComplete = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo)));
    };
    return (
        <ul>
            {todos.map((todo, index) => (
                <ToDoItem item={todo} index={index} onComplete={onComplete}></ToDoItem>
            ))}
        </ul>
    );
};

export default ToDoList;
