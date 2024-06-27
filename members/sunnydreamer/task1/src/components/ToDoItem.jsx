import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';


const ToDoItem = ({ tasks, task, setTasks, deleteTask }) => {
    const [isChecked, setIsChecked] = useState(task.checked);

    const handleCheckboxChange = (event) => {
        const updatedChecked = event.target.checked;
        setIsChecked(updatedChecked);

        const updatedTasks = tasks.map((item) =>
            item.id === task.id ? { ...item, checked: updatedChecked } : item
        );

        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <div className='toDoItemContainer'>
            <div className="toDoItemLeft">
                <Checkbox
                    checked={isChecked} // Pass the checked state
                    sx={{
                        color: red[800],
                        '&.Mui-checked': {
                            color: red[600],
                        },
                    }}
                    onChange={handleCheckboxChange}
                />
                <p style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{task.name}</p>

            </div>
            <div className="toDoItemRight">
                <DeleteOutlinedIcon className="deleteButton" onClick={() => deleteTask(task.id)} />
            </div>
        </div>
    )
}

export default ToDoItem;
