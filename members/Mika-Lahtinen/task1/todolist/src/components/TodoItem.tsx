const TodoItem = ({todo, toggleTodo, deleteTodo}) => {
    return (
        <li
            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
            onClick={toggleTodo}>
            <span>{todo.text}</span>
            <button onClick={deleteTodo}>Delete it</button>
        </li>
    );
};

export default TodoItem