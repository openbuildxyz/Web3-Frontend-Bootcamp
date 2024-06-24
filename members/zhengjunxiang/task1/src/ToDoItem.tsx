import { Item } from './index.d';
interface ToDoItem {
    item: Item;
    onToggle: (itemId: number) => void;
    onDelete: (itemId: number) => void;
} 

const ToDoItem = ({ item, onToggle, onDelete }:ToDoItem) => {
    return (
         <div>
        <input type="checkbox" checked={item.done} onChange={() => onToggle(item.id)} />
            <span className={item.done?'strike-through mr-2':'mr-2'}>{item.text}</span>
            <button onClick={() => onDelete(item.id)} className="delete">删除</button>
        </div>
    )
}

export default ToDoItem