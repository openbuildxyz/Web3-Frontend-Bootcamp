import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>(
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList")!)
      : []
  );

  const addTodo = (newTodo: TodoItem) => {
    setTodoList((prev) => [...prev, newTodo]);
  };

  const deleteTodoItem = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggle = (id: number) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }

        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-gray-900 grid h-screen place-items-center">
      <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
        <Header />

        <AddTodo onAdd={addTodo} />

        <TodoList
          todoList={todoList}
          deleteTodoItem={deleteTodoItem}
          toggle={toggle}
        />
      </div>
    </div>
  );
};

export default App;
