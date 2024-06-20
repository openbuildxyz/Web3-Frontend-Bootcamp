import { useState, useEffect } from "react";
import AddToDo from "./AddToDo";
import ToDoItem from "./ToDoItem";

function ToDoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addItem = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <AddToDo addItem={addItem} />
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          item={todo}
          deleteItem={deleteItem}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default ToDoList;
