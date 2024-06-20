export const ToDoItem = ({todo, toggleTodo, deleteTodo,}) => {
    const textDecoration = todo.completed ? 'line-through' : 'none'

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span style={{textDecoration}}>
                {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
        </div>
    )
}