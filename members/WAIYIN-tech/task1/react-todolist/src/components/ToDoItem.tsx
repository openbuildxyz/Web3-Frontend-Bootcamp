import React from "react"

interface Item {
    id: string;
    content: string;
    completed: boolean;

    onUpdateStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

const ToDoItem: React.FC<Item> = ({id, content, completed, onUpdateStatus, onDelete})=>{
    return (
        <li>
            <span style={ {cursor: 'pointer', textDecoration:completed ? "line-through" : ""}} onClick={() => {onUpdateStatus(id)}}>{content}</span>
            <button onClick={()=>{onDelete(id);}}>DELETE</button>
        </li>
    )
}

export default ToDoItem;