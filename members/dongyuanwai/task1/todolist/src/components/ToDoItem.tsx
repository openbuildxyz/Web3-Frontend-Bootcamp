export default function ToDoItem({ todo, deleteTodo, toggleTodo }:{ todo:any, deleteTodo, toggleTodo }) {
    return (
      <li
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={toggleTodo}
      >
        <span>{todo.text}</span>
        <button
            style={{ backgroundColor: 'red', marginTop:'20px', marginLeft:'20px',color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            onClick={deleteTodo}>Delete
        </button>
      </li>
    )
  }