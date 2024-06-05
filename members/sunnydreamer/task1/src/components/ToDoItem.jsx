import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ToDoItem = ({ index, task, deleteTask }) => {
    const [isChecked, setIsChecked] = useState(false); // Default state is false (unchecked)

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className='toDoItemContainer'>
            <div className="toDoItemLeft">
                <Checkbox
                    {...label}
                    checked={isChecked} // Pass the checked state
                    sx={{
                        color: red[800],
                        '&.Mui-checked': {
                            color: red[600],
                        },
                    }}
                    onChange={handleCheckboxChange}
                />
                <p style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{task}</p>

            </div>
            <div className="toDoItemRight">
                <DeleteOutlinedIcon className="deleteButton" onClick={() => deleteTask(index)} />
            </div>
        </div>
    )
}

export default ToDoItem;
