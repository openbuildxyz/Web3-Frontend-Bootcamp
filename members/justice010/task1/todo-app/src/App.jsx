import "./App.css";
import { Header } from "./Header";
import { AddToDo } from "./AddToDo";
import { ToDoList } from "./ToDoList";
import { useState, useEffect } from "react";
 
// 主应用组件
export default function App() {
  const [todos, setTodos] = useState(() => {
    const localTodos = localStorage.getItem("todos");
    return localTodos ? JSON.parse(localTodos) : initialtodos;
  });
 
  // 当todos发生变化时，将其存储到localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
 
  // 添加新的待办事项
  function addNewTodo(text) {
    const nextId = todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0;
    setTodos([...todos, {id: nextId, text, isDone: false }]);
  }
 
  // 删除指定的待办事项
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
 
  // 切换待办事项的完成状态
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }
 
  return (
    <div className="App">
      <Header />
      <AddToDo addToDo={addNewTodo} />
      <ToDoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
    </div>
  );
}
 
// 初始待办事项列表
const initialtodos = [
  { id: 0, text: "买菜", isDone: false },
  { id: 1, text: "打扫卫生", isDone: false },
  { id: 2, text: "洗车", isDone: true },
];