import {ToDoItem} from "./ToDoItem.jsx";

export const ToDoList = ({todos, deleteTodo, toggleTodo}) => {
    return (
        <ul>
            {todos.map(todo => (
                <span className="todo-liet" key={todo.id}>
                    <ToDoItem
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    />
                </span>
            ))}
        </ul>
    )
}