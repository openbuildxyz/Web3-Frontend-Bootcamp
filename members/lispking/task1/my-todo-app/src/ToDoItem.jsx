function ToDoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <li
      className={todo.completed ? "completed" : ""}
      onClick={() => toggleComplete(todo.id)}
    >
      {todo.text} <button onClick={() => deleteTodo(todo.id)}>完成</button>
    </li>
  );
}

export default ToDoItem;
