import ToDoItem from './ToDoItem';
import PropTypes from 'prop-types';

function ToDoList({todos, setTodos}) {
    return (
        <div>
            {todos.map((todo, index) => (
                <ToDoItem 
                key={index}
                todo={todo}
                todos={todos}
                setTodos ={setTodos}
                index={index}
                />
            ))}
        </div>
    );
}



ToDoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    })).isRequired,
    setTodos: PropTypes.func.isRequired
};


export default ToDoList;