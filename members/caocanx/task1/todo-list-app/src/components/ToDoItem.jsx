function ToDoItem({ todo, deleteTodo, toggleTodoStatus }) {
    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoStatus(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.content}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    )
}

export { ToDoItem }