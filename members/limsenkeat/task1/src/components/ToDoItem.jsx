import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

function ToDoItem({ todo, deleteTodo, toggleTodo }) {
    return (
        <li>
            <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={toggleTodo} 
            />
            <span 
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
            {todo.text}
            </span>
            <button onClick={deleteTodo}>X</button>
        </li>
    );
}

ToDoItem.propTypes = {
    todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
    }).isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default ToDoItem;