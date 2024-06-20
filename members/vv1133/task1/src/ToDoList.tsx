import { Item } from './interface';
import ToDoItemProps from "./ToDoItem";

interface ToDoListProps {
    items: Item[];
    onDelete: (itemId: number) => void;
    onToggle: (itemId: number) => void;
}

const ToDoList = ({ items, onDelete, onToggle }:ToDoListProps) => {
    return (
        <div>
            <ul>
                {items.map((item) => {
                    return (
                        <li key={item.id}>
                            <ToDoItemProps item={item} onDelete={onDelete} onToggle={onToggle}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ToDoList