function ToDoItem({
  todo,
  toggleTodo,
  deleteTodo,
}: {
  todo: Todo;
  toggleTodo: TodoActions["toggleTodo"];
  deleteTodo: TodoActions["deleteTodo"];
}) {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg my-2 shadow">
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        className="cursor-pointer"
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </li>
  );
}

export default ToDoItem;
