import { useState } from "react";
import AddTodo from "./components/add-todo";
import TodoList from "./components/todo-list";
import Header from "./components/header";
import { Todo } from "./types/todo";
import { getTodos, saveTodos } from "./store";
import "./index.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>(getTodos);

  const updateList = (list: Todo[]) => {
    setTodos(list);
    saveTodos(list);
  };

  const addTodo = (text: string) => {
    if (!text) return;
    const newTodo = { id: Date.now(), text, isCompleted: false };
    const newList = [...todos, newTodo];
    updateList(newList);
  };

  const toggleStatus = (id: number, checked: boolean) => {
    const todo = todos.find((x) => x.id === id);
    if (todo) {
      todo.isCompleted = checked;
      updateList([...todos]);
    }
  };

  const deleteTodo = (id: number) => {
    const newList = todos.filter((todo) => todo.id !== id);
    updateList(newList);
  };

  return (
    <div className="container mx-auto p-6 mt-24 flex items-center justify-center flex-col gap-4">
      <Header />
      <AddTodo addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleStatus={toggleStatus}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
