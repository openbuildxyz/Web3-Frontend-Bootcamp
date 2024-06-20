import ToDoItem from "./ToDoItem";
import { ToDo } from "../types/ToDo";

interface IToDoList {
    items: ToDo[]
    onCheck: (id: number) => void
    onDelete: (id: number) => void
    onTextChange: (id: number, text: string) => void
}
const ToDoList: React.FC<IToDoList> = ({ items, onCheck, onDelete, onTextChange }) => {
    return (
        <ul>
            {/* 遍历 items 并复用 ToDoItem */}
            {items.map(todoItem => {
                return <ToDoItem key={todoItem.id} todo={todoItem} toggleCheck={onCheck} onDelete={onDelete} onTextChange={onTextChange} />
            })}
        </ul>
    )
}

export default ToDoList;