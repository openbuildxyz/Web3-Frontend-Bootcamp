function ToDoItem({ completed, id, title, toggleTodo, deleteTodo }) {
    return (
      <li className={completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}
          />
          {title}
        <button onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </li>
    )
  }

  export {ToDoItem};