import { Items } from './index.d';
import ToDoItem from "./ToDoItem"

interface ToDoList {
    items: Items;
    onToggle: (itemId: number) => void;
    onDelete: (itemId: number) => void;
} 


const ToDoList = ({items, onDelete, onToggle}:ToDoList) => {
    return (
        <div>
            <ul>
                {items.map((item) => {
                    return (
                        <li key={item.id}>
                            <ToDoItem item={item} onDelete={onDelete} onToggle={onToggle}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ToDoList

