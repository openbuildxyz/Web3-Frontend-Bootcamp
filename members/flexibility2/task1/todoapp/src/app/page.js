"use client";
import React from "react";
import Header from "@/components/Header";
import Form from "@/components/Form";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";
// { title: "Some task", id: self.crypto.randomUUID(), is_completed: false },
// {
//   title: "Some other task",
//   id: self.crypto.randomUUID(),
//   is_completed: true,
// },
// { title: "last task", id: self.crypto.randomUUID(), is_completed: false },
function Home() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const todos_completed =
    todos?.filter((item) => item.is_completed === true).length ?? 0;
  const total_todos = todos?.length ?? 0;
  return (
    <div className="wrapper">
      <Header />
      <TODOHero todos_completed={todos_completed} total_todos={total_todos} />
      <Form todos={todos} setTodos={setTodos} />
      <TODOList todos={todos} setTodos={setTodos} />
    </div>
  );
}
export default Home;
