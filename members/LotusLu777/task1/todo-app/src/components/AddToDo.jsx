import { useState } from "react";
import PropTypes from 'prop-types';

function AddToDo({ setTodos }) {
    const[input, setInput] = useState('');

    const handleAdd = (event) => {
        event.preventDefault(); 
        if (input.trim()) {
            setTodos(prevTodos =>[
                ...prevTodos,
                {text: input, isCompleted: false}
            ]);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleAdd}>
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="添加新的待办事项"
            />
            <button type="submit">添加</button>
        </form>
        
    );
}

AddToDo.propTypes ={
    setTodos: PropTypes.func.isRequired
};

 export default AddToDo
