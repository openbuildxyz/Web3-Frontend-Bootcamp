import { Item } from './interface';

interface ToDoItemProps {
    item: Item;
    onDelete: (itemId: number) => void;
    onToggle: (itemId: number) => void;
}

const ToDoItem = ({ item, onDelete, onToggle }:ToDoItemProps) => {
    return (
        <div>
            <input type='checkbox' className='input-checkbox' checked={item.done} onChange={() => onToggle(item.id)} />
            <span className={item.done?'strike-through mr-2':'mr-2'}>{item.text}</span>
            <button  onClick={() => onDelete(item.id)} className='del-btn'>删除</button>
        </div>
    )
}

export default ToDoItem