import { useState } from "react";

// 定义接口
interface DeleteToDoProps {
    index: number;
    msg: string;
    status: boolean;
    deleteToDo: (index: number) => void;
}

function ToDoItem({ index, msg, status, deleteToDo }: DeleteToDoProps) {
    const [curStatus, setCurStatus] = useState(status)
    const handleDelete = () => {
        deleteToDo(index);
    };
    const handleRadioClick = () => {
        // 改变当前记录的状态，并放在最后
        setCurStatus(!curStatus);
    };
    return (
        <li key={index} className="my-5">
            <div className="flex w-full text-left border-b-2 border-solid">
                {
                    !curStatus ?
                        <input checked={curStatus} type="radio" onChange={handleRadioClick} /> :
                        ""
                }
                <div className="ml-2 w-4/5">{msg}</div>
                <div className="inline ml-5 cursor-pointer text-green-700 w-1/5 text-right" onClick={handleDelete}>X</div>
            </div>
        </li>

    );
}

export default ToDoItem;
