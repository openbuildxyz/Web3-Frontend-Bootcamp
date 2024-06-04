import React, {FC, useState, useEffect} from "react";
import '../index.css';
import '../App.css';

const ToDoItem: FC<{ task: ITask, updateTask: (task: ITask) => void, deleteTask: (taskName: string) => void }> = ({ task, updateTask, deleteTask }) => {

    // const [checked, setChecked] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(task.completed);

    useEffect(() => {
        setChecked(task.completed); // Update checked state when task.completed changes
    }, [task.completed]);

    const handleChange = () => {
        setChecked(!checked);
        updateTask({ ...task, completed: !checked });
        console.log('checked: ', checked);
    }

    const handleDelete = () => {
        deleteTask(task.taskName);
    };
    
    return (
        <li>
            {checked ? (
                <input type="checkbox" value={checked} checked onChange={handleChange}/>
            ) : (
                <input type="checkbox" value={checked} onChange={handleChange}/>
            )}
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