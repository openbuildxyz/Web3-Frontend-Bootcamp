import { useEffect, useState } from "react";
import AddToDo from "./AddToDo";
import ToDoItem, { TodoItemData } from "./ToDoItem";

export default function ToDoList() {
  const [todoList, setTodoList] = useState<TodoItemData[]>([]);

  useEffect(() => {
    setTodoList(loadFromLocalStorage());
  }, []);

  function onAdd(content: string) {
    const newTodoList = [
      {
        id: Date.now().toString(),
        content,
        isDone: false,
      },
      ...todoList,
    ];
    setTodoList(newTodoList);
    saveToLocalStorage(newTodoList);
  }

  function onRemove(id: string) {
    const newTodoList = todoList.filter((item) => item.id != id);
    setTodoList(newTodoList);
    saveToLocalStorage(newTodoList);
  }

  function onUpdateIsDone(id: string) {
    const newTodoList = [...todoList];
    for (const item of newTodoList) {
      if (item.id == id) {
        item.isDone = !item.isDone;
        break;
      }
    }
    setTodoList(newTodoList);
    saveToLocalStorage(newTodoList);
  }

  return (
    <div className="container mx-auto max-w-max">
      <AddToDo onAdd={onAdd} />
      <ul className="flex flex-col gap-y-1">
        {todoList.map((item) => (
          <ToDoItem
            key={item.id}
            data={item}
            onRemove={onRemove}
            onUpdateIsDone={onUpdateIsDone}
          />
        ))}
      </ul>
      Total: {todoList.length}
    </div>
  );
}

const storageKey = "TODO_LIST";
function saveToLocalStorage(data: TodoItemData[]) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}
function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]") as TodoItemData[];
}
