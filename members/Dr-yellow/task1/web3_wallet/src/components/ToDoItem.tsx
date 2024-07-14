import { ItemProps } from "../typings";



const ToDoItem: React.FC<ItemProps> = ({ item, toggleItem, deleteItem }) => {
    return (
        <div className="todo-item flex items-center justify-center p-4">
            <input type="checkbox" checked={item.completed} className="m-0 w-6 h-6" onChange={() => { toggleItem(item.id) }} />
            <div className={`flex flex-1 text-lg break-words pr-3 pl-3 content ${item.completed && "line-through"}`}>
                {item.content}
            </div>
            <div className="actions">
                <button className="btn-delete p-1 w-14 h-8 bg-cyan-600 rounded-full" onClick={() => { deleteItem(item.id) }}>delete</button>
            </div>
        </div>
    );
}

export default ToDoItem;