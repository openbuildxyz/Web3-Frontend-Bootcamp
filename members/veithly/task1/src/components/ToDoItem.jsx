import PropTypes from 'prop-types';

const ToDoItem = ({ todo, deleteToDo, toggleComplete }) => {
  return (
    <div className="todo-item flex justify-between items-center p-2 border-b border-gray-300">
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleComplete(todo.id)}
        className="cursor-pointer flex-grow"
      >
        {todo.title}
      </span>
      <button onClick={() => deleteToDo(todo.id)} className="bg-red-500 text-white p-2 rounded ml-2">Delete</button>
    </div>
  );
};

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteToDo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default ToDoItem;
