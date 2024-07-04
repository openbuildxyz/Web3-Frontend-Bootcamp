import ToDoItem from "./to-do-item.jsx";

function TodoList({ list, deleteTodo, toggleToDoComplete }) {
  return (
    <ul>
      {list.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleToDoComplete={toggleToDoComplete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
