import React, {FC, useState} from "react";
import '../index.css';
import '../App.css';

const ToDoItem: FC<{ task: ITask, deleteTask: (taskName: string) => void }> = ({ task, deleteTask }) => {

    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = () => {
        setChecked(!checked);
    }

    const handleDelete = () => {
        deleteTask(task.taskName);
    };
    
    return (
        <li>
            <input type="checkbox" value={checked} onChange={handleChange}/>
            {checked ? (
                <label className="checked">{task.taskName}</label>
            ) : (
                <label>{task.taskName}</label>
            )}
            <button className="delete" onClick={handleDelete}>X</button>
        </li>
    )
}

export default ToDoItem