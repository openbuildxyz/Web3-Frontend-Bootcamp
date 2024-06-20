import { ToDoItem } from "./ToDoItem"

function ToDoList({ todos, setTodos, deleteTodo, toggleTodoStatus }) {
    return (
        <div>
            {todos.map((todo) => (
                <ToDoItem
                    key={todo.id}
                    todo={todo}
                    setTodos={setTodos}
                    deleteTodo={deleteTodo}
                    toggleTodoStatus={toggleTodoStatus}
                />
            ))}
        </div>
    )
}

export { ToDoList }