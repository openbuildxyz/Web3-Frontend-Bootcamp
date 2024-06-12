import { useState, useEffect } from "react";
import "./App.css";
import "@/TodoList.css";
import Header from "./components/Header";
import AddTodo from "./components/AddToDo";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos")!)
      : []
  );

  const [todoCount, setTodoCount] = useState<number>(0)
  const [uncompletedCount, setUncompletedCount] = useState<number>(0)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodoCount(todos.length)
    setUncompletedCount(todos.filter(todo=>!todo.completed).length)
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Header />
      <div className="todo-container">
        <AddTodo onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
      <Footer todoCount={todoCount} uncompletedCount={uncompletedCount} />
    </>
  );
}

export default App;
