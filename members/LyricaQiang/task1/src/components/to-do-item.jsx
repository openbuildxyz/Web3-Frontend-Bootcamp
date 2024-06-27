function TodoItem({ todo, deleteTodo, toggleToDoComplete }) {
  console.log(todo);

  return (
    <li
      className={todo.complete ? "completed" : ""}
      onClick={() => toggleToDoComplete(todo.id)}
    >
      <span className="todo-item">{todo.text}</span>
      <button
        onClick={event => {
          event.stopPropagation();
          deleteTodo(todo.id);
        }}
      >
        删除
      </button>
    </li>
  );
}

export default TodoItem;
