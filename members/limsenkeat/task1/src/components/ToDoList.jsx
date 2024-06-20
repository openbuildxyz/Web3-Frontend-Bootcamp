import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, deleteTodo, toggleTodo }) {
    return (
        <ul>
        {todos.map((todo, index) => (
            <ToDoItem 
            key={index} 
            todo={todo} 
            deleteTodo={() => deleteTodo(index)} 
            toggleTodo={() => toggleTodo(index)} 
            />
        ))}
        </ul>
    );
}

ToDoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
        })
    ).isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default ToDoList;