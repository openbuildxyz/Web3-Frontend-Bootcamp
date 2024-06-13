import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import AddToDo from "./AddToDo.jsx";
import ToDoList from "./ToDoList.jsx";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const deleteTodo = (id) => {
    if (window.confirm('确定要删除该待办事项吗？')) {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    }
  };

  const clearTodos = () => {
    if (window.confirm('确定要清空所有待办事项吗？')) {
      setTodos([]);
    }
  }

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
      <button className="button clear-todos" onClick={clearTodos}>
        清空所有待办事项【共 {todos.length} 个】
      </button>
    </div>
  );
}

export default App;
