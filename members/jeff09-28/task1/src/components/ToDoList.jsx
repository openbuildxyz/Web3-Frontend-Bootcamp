import {ToDoItem} from "./ToDoItem.jsx";

export const ToDoList = ({todos, deleteTodo, toggleTodo}) => {
    return (
        <ul>
            {todos.map(todo => (
                <div key={todo.id}>
                    <span>
                        <ToDoItem
                            todo={todo}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                        />
                    </span>

                </div>
            ))}
        </ul>
    )
}