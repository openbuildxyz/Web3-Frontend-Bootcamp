import "./ToDoItem.css";
import {Item} from "../type";

const ToDoItem: React.FC<{ item: Item, del: (item: Item) => void, changeStatus: (item: Item) => void }> = (props) => {
    return <div className="todo-item">
        <div className={props.item.status?"todo-item-status-end":"todo-item-status-ing"}>{props.item.status ? "✔" : "X"}</div>
        <div className="todo-item-text">{props.item?.message || "default message"}</div>
        <div className="todo-item-btn" onClick={() => props.changeStatus(props.item)}>change</div>
        <div className="todo-item-btn" onClick={() => props.del(props.item)}>delete</div>
    </div>
}
export default ToDoItem;