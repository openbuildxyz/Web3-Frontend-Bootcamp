import TodoItem from "./todo-item";

function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: Todo[];
  toggleTodo: TodoActions["toggleTodo"];
  deleteTodo: TodoActions["deleteTodo"];
}) {
  return (
    <ul className="list-none">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
