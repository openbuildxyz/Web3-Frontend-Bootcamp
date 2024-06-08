import ToDoItem from "./ToDoItem.jsx";

function ToDoList({ todos, deleteTodo, toggleComplete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
