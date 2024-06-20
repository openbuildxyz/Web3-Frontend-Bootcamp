function ToDoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <li
      className={todo.completed ? "completed" : ""}
      onClick={() => toggleComplete(todo.id)}
    >
      {todo.text}
      <button onClick={(event) => {
        event.stopPropagation();
        deleteTodo(todo.id);
      }}>删除</button>
    </li>
  );
}

export default ToDoItem;
