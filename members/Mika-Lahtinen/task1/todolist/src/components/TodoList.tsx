import TodoItem from "./TodoItem";

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
    return (
        <ul>
            {
                todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        todo={todo}
                        deleteTodo={() => deleteTodo(index)}
                        toggleTodo={() => toggleTodo(index)}
                    />
                ))
            }
        </ul>
    );
}

export default TodoList