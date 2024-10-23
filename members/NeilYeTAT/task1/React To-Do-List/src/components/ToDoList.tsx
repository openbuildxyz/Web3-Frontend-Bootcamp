import { useEffect, useState } from "react";
import AddToDo from "./AddToDo";
import TodoItem from "./ToDoItem";
import type { ITodoType } from "../type/ITodoType";

export default function ToDoList() {
  const [todoList, setTodoList] = useState<ITodoType[]>(
    JSON.parse(localStorage.getItem("todo")!) || []
  );

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  // 完成 和 未完成
  const toggleFinishState = (id: string) => {
    setTodoList(
      todoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isFinish: !todoItem.isFinish }
          : todoItem
      )
    );
  };
  // 移出 todo
  const removeTodo = (id: string) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
  };

  return (
    <div className="flex flex-col w-2/3 gap-4">
      <AddToDo todoList={todoList} setTodoList={setTodoList}></AddToDo>

      {todoList.map((todoItem) => (
        <TodoItem
          todoItem={todoItem}
          key={todoItem.id}
          toggleFinishState={toggleFinishState}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
}
