import { ToDo } from "../typings";


interface IProps {
    item: ToDo;
    toggleItem: (id: number) => void,
    deleteItem: (id: number) => void
}


const ToDoItem: React.FC<IProps> = ({ item, toggleItem, deleteItem }) => {
    return (
        <div className="todo-item">
            <input type="checkbox" checked={item.completed} className="checkbox" onChange={() => { toggleItem(item.id) }} />
            <div className={`content ${item.completed ? "completed" : ""}`}>
                {item.content}
            </div>
            <div className="actions">
                <button className="btn-delete" onClick={() => { deleteItem(item.id) }}>delete</button>
            </div>
        </div>
    );
}

export default ToDoItem;