export default function ToDoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <li
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      onClick={toggleTodo}
    >
      <span>{todo.text}</span>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  )
}
