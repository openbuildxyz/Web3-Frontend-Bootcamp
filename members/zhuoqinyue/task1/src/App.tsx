import { useEffect, useState } from "react";
import "./App.css";
import { AddToDo, Flag, Footer, Header, ToDoList } from "./components";
import type { Todo } from "./components/types";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const saveTodos = (todoList: Todo[]) => {
    setTodos(todoList || []);
    localStorage.setItem("your_todo", JSON.stringify(todoList));
  };

  const createTodoItems = (value: string) => {
    const timeStamp = +new Date();
    const obj = {
      name: value,
      status: false,
      id: timeStamp.toString(),
    };

    const arr = [...todos];
    arr.push(obj);
    saveTodos([...arr] || []);
  };

  const finishTodo = (id: string) => {
    const newTodo = todos?.map((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    saveTodos([...newTodo] || []);
  };

  const deleteTodo = (id: string) => {
    const newTodo = todos?.filter((item) => item.id !== id);
    saveTodos(newTodo || []);
  };

  useEffect(() => {
    const yourTodo = localStorage.getItem("your_todo");
    if (yourTodo) {
      const todo = JSON.parse(yourTodo);
      setTodos(todo || []);
    } else {
      localStorage.setItem("your_todo", JSON.stringify(todos));
    }
  }, []);

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Flag />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Header />
        <AddToDo handleAddItems={createTodoItems} />
        <ToDoList
          todoList={todos}
          finishTodo={finishTodo}
          deleteTodo={deleteTodo}
        />

        <Footer
          len={todos?.length}
          finishLen={todos?.filter((item) => item.status)?.length}
        />
      </div>

      <section style={{ color: "#888", fontSize: 12, marginTop: 24 }}>
        Palestine is a country, always
      </section>
    </main>
  );
};

export default App;
