import React from "react";
import ToDoItem, {ITodoItem} from "./ToDoItem";

interface IProps {
    list: ITodoItem[];
    onRemove: (id: string) => void;
    onDone: (id: string, flag: boolean) => void;
}

const ToDoList: React.FC<IProps> = (props) => {
    const {list, onRemove, onDone} = props;
    return (
        <ul>
            {list.map(item => {
                return <ToDoItem key={item.id} {...item} 
                onDone={(flag: boolean) => {
                    onDone(item.id, flag);
                }} 
                onRemove={() => {
                    onRemove(item.id);
                }} 
                />
            })}
        </ul>
    );
}
export default ToDoList;