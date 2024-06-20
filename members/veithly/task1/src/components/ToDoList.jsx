import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, deleteToDo, toggleComplete }) => {
  return (
    <div>
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteToDo={deleteToDo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  deleteToDo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default ToDoList;
