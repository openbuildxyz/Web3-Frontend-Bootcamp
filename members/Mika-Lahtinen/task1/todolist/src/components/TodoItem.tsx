/*
 * For the implementation of th e todolist,
 * here I design it into two components:
 * 1. Items
 * 2. List
 * 
 * Here is the implementation of the Items component.
 */

const TodoItem = ({ todo, deleteTodo, toggleTodo }) => {
    return (
        <li>
            <input type="checkbox"
                defaultChecked={todo.completed}
                onClick={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    )
};

export default TodoItem