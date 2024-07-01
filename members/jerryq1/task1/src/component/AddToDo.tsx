// AddToDo.jsx
import  { useState } from 'react';

const AddToDo = ({ addTodo }) => {
    const [title, setTitle] = useState('');

    const onClick = () => {
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        }
    };

    return (
        <div className={'bottom'}>
            <input
                type="text"
                placeholder="Add ToDo ..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                onClick={onClick}
                className="btn"
            >
                Add
            </button>
        </div>
    );
};



export default AddToDo;
