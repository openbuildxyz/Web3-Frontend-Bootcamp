import React, { useState } from 'react';

interface AddToDoProps {
    onAdd: (todo: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ onAdd }) => {
    const [todo, setTodo] = useState('');

    const handleAdd = () => {
        if (todo.trim() !== '') {
            onAdd(todo);
            setTodo('');
        }
    };

    return (
        <div className="add-todo-container">
            <input 
                type="text" 
                value={todo} 
                onChange={(e) => setTodo(e.target.value)} 
                placeholder="Add a new task" 
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};

export default AddToDo;
