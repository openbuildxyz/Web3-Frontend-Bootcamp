import { useEffect, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import { AddToDo } from "./AddToDo";

export interface ITodoItem {
  id: string;
  content?: string;
  isDone: boolean;
}

export function ToDoList() {
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);

  const onUpdateDoneStatus = (id: string, isDone: boolean) => {
    const newTodoList = [...todoList];
    const todoItem = newTodoList.find((item) => item.id === id);
    if (todoItem) {
      todoItem.isDone = isDone;
    }
    setTodoList(newTodoList);
    saveToLocal(newTodoList);
  };

  const onAdd = (content: string) => {
    const newTodoList = [
      ...todoList,
      {
        id: Date.now().toString(),
        isDone: false,
        content,
      },
    ];
    setTodoList(newTodoList);
    saveToLocal(newTodoList);
  };
  const onDelete = (id: string) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
    saveToLocal(newTodoList);
  };

  // recover data
  useEffect(() => {
    setTodoList(recoverData());
  }, []);

  return (
    <div className="w-[calc(100vw_-_32px)] max-w-[480px]">
      <ul>
        {todoList.map((item) => (
          <ToDoItem
            data={item}
            onDelete={onDelete}
            onUpdateDoneStatus={onUpdateDoneStatus}
          />
        ))}
      </ul>
      <AddToDo onAdd={onAdd} />
    </div>
  );
}

const storageKey = "todo-list";
function saveToLocal(data: ITodoItem[]) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}
function recoverData() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]") as ITodoItem[];
}
