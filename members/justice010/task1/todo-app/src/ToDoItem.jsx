import PropTypes from "prop-types";

export function ToDoItem({ todo, onToggle, onDelete }) {

  function handleToggle() {
    onToggle(todo.id);
  }

  function handleDelete() {
    onDelete(todo.id);
  }

  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.isDone} onChange={handleToggle} />
      <span>{todo.text}</span>
      <button onClick={handleDelete}>删除</button>
    </div>
  );
}

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};
