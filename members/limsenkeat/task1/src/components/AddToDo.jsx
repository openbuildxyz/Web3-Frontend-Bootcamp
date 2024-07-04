import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

function AddToDo ({ addTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
        addTodo(inputValue);
        setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            value={inputValue} 
            className="todo-input"
            placeholder='Enter task name...'
            onChange={(e) => setInputValue(e.target.value)} 
        />
        <button type="submit">Add</button>
        </form>
    );
}

AddToDo.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default AddToDo;