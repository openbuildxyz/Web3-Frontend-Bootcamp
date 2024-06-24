import { useEffect, useState } from "react";
import { ToDoItem } from "../ToDoItem";
import { AddToDo } from "../AddToDo";

export interface Todo {
  createAt: string,
  content: string,
  complete: boolean,
}

export default function ToDoList() {
  const [todos, setTodo] = useState<Todo[]>(() => {
    const todos = localStorage.getItem('todos')
    if (todos) return JSON.parse(todos)
    return []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  return <div className="p-2">
    <AddToDo onAddTodo={setTodo} />
    <ul className="my-2">
      {
        todos.map((i, k) => (
          <ToDoItem key={k} item={i} onSetTodo={setTodo} />
        ))
      }
    </ul>
  </div>
}
