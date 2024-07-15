import { useState, useEffect } from "react";
import AddToDo from "./AddToDo";
import ToDoItem from "./ToDoItem";
import { TodoItem } from "./interface";

const ToDoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo: TodoItem) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, todo];
      return newTodos;
    });
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      return newTodos;
    });
  };

  const handleRemoveTodo = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      return newTodos;
    });
  };

  return (
    <div>
      <AddToDo onAddTodo={handleAddTodo} />
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggleTodo}
          onRemove={handleRemoveTodo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
