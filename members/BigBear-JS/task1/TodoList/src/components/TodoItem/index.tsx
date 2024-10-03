import { Todo } from "../../types";
import './index.css'

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}
export default function TodoItem({ todo, onDelete, onToggle }: TodoItemProps) {
    return (
        <li className="todoitem">
            <div className="todoitem-text" style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</div>    
            <div>
                <button onClick={() => onToggle(todo.id)}>toggle</button>
                <button onClick={() => onDelete(todo.id)}>delete</button>
            </div>
        </li>
    )
}