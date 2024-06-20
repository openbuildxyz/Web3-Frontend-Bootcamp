import "./todoItem.css"

const ToDoItem = ({todo, deleteTodo, toggleTodo}) => {
    return (
        <li onClick={() => toggleTodo(todo.id)}>
            <span className="itemSpan" style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
            }}>
                {todo.value}
            </span>
            <button onClick={(e) => {
                e.stopPropagation()
                deleteTodo(todo.id)
            }} style={{marginLeft: '30px'}}>Delete</button>
        </li>
    )
}

export default ToDoItem;